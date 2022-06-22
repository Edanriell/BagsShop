import { postData } from "../services/requests.js";
import Notifications from "./notifications.js";
import Spinner from "../../images/spinner.svg";
import FormValidation from "./formValidation.js";

export default class Forms {
	static notification = false;

	constructor({
		triggerForm,
		databaseName,
		spinnerSrc,
		sendDataButton,
		topCoordinates,
		leftCoordinates,
		submitButton
	}) {
		this.forms = document.querySelectorAll(triggerForm);
		this.database = databaseName;
		this.spinner = spinnerSrc;
		this.triggerButton = sendDataButton;
		this.top = topCoordinates ?? 50;
		this.left = leftCoordinates ?? 50;
		this.submitBtn = document.querySelector(submitButton);
	}

	init() {
		this.forms.forEach(form => {
			this.#bindPostData(form, this.database);
			this.#disableSubmitButton();
		});
	}

	#bindPostData(form, database) {
		form.addEventListener("submit", e => {
			e.preventDefault();
			this.#displayLoader(form, e.target);
			this.#switchButtonText(this.triggerButton);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData(`http://localhost:3000/${database}`, json)
				.then(data => {
					// eslint-disable-next-line no-console
					console.log(data);
					document.querySelector(".Spinner").remove();
					Forms.displaySuccess("Данные успешно отправлены.", "success");
				})
				.catch(error => {
					if (error.name === "NetworkError") {
						Forms.displayError(
							`Возможно вы отключены от сети.
							Проверьте свое подключение к сети и повторите попытку отправить данные.`
						);
						document.querySelector(".Spinner").remove();
					} else if (error instanceof TypeError) {
						Forms.displayError(
							`Произошла ошибка при отправке данных на сервер.
							Повторите попытку позже.`
						);
						document.querySelector(".Spinner").remove();
					} else {
						Forms.displayError(error);
						document.querySelector(".Spinner").remove();
					}
				})
				.finally(() => {
					this.#switchButtonText(this.triggerButton);
					form.reset();
					Forms.notification = false;
					this.#disableSubmitButton();
					FormValidation.resetState();
				});
		});
	}

	#displayLoader(form, targetButton) {
		const loaderImg = document.createElement("div");
		loaderImg.classList.add("Spinner");
		loaderImg.style.cssText = `
			display: block;
			position: absolute;
			height: 52px;
			top: ${this.top}%;
			left: ${this.left}%;
			transform: translate(-50%,-50%);
			z-index: 9999;
			height: 40px;
			width: 40px;
			background: url("${Spinner}") transparent
		`;
		targetButton.querySelector("button").parentElement.append(loaderImg);
	}

	static displayError(notificationText, notificationType) {
		if (!Forms.notification) {
			Forms.notification = true;
			const notifications = new Notifications({
				notificationText,
				showNotificationAnimationClass: "ErrorFadeIn",
				removeNotificationAnimationClass: "ErrorFadeOut",
				removeNotificationByTimeout: true,
				timeoutTime: 5000,
				notificationWidth: 800,
				notificationHeight: 120,
				notificationLeftPos: 32.4,
				notificationBotPos: 40,
				notificationType
			});
			notifications.init();
		}
	}

	static displaySuccess(notificationText, notificationType) {
		const notifications = new Notifications({
			notificationText,
			showNotificationAnimationClass: "ErrorFadeIn",
			removeNotificationAnimationClass: "ErrorFadeOut",
			removeNotificationByTimeout: true,
			timeoutTime: 5000,
			notificationWidth: 800,
			notificationHeight: 120,
			notificationLeftPos: 32.4,
			notificationBotPos: 40,
			notificationType
		});
		notifications.init();
	}

	#switchButtonText(selector) {
		const button = document.querySelector(selector);
		if (button.style.color === "transparent") {
			button.style.cssText = `
				color: white;
				text-shadow: 0 0 2px rgba(0,0,0,0.1);
			`;
		} else {
			button.style.cssText = `
				color: transparent;
				text-shadow: initial;
			`;
		}
	}

	#disableSubmitButton() {
		this.submitBtn.disabled = true;
		this.submitBtn.style.filter = "grayscale(100%)";
	}
}

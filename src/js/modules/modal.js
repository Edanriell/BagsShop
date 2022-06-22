export default class Modal {
	constructor({
		triggerBtns,
		modalSelector,
		modalWrapperSelector,
		showAnimationClass,
		hideAnimationClass,
		showModalWrapperClass,
		hideModalWrapperClass,
		closeModalTriggerBtn,
		closeModalWindowByEsc,
		closeModalWindowByClickAndBtn,
		showModalWindowByTimer,
		modalTimer,
		showModalWindowByScroll,
		scrollDocumentScrolledBy,
		helperFunctions
	}) {
		this.trigger = document.querySelectorAll(triggerBtns);
		this.modal = document.querySelector(modalSelector);
		this.wrapper = document.querySelector(modalWrapperSelector);
		this.showModalAnimation = showAnimationClass;
		this.hideModalAnimation = hideAnimationClass;
		this.showModalWrapperAnimation = showModalWrapperClass; //
		this.hideModalWrapperAnimation = hideModalWrapperClass; //
		this.closeModal = document.querySelector(closeModalTriggerBtn);
		this.closeByClickAndBtn = closeModalWindowByClickAndBtn;
		this.closeModalByEsc = closeModalWindowByEsc;
		this.showModalByTimer = showModalWindowByTimer;
		this.timer = modalTimer;
		this.modalTriggered = false;
		this.showModalByScroll = showModalWindowByScroll;
		this.scrollValue = scrollDocumentScrolledBy;
		this.helpers = helperFunctions || null;
	}

	init() {
		this.#showModalByTimer(this.showModalByTimer, this.timer);
		this.#showModalByScroll(this.showModalByScroll, this.scrollValue);
		this.trigger.forEach(btn => {
			btn.addEventListener("click", evt => this.showModal(evt));
		});
	}

	showModal(evt) {
		evt.preventDefault();
		this.modalTriggered = true;
		const currentClientWidth = document.body.clientWidth;
		document.body.style.overflow = "hidden";
		this.#createModal(currentClientWidth);
		this.#closeModalByEscButton(this.closeModalByEsc);
		this.#closeModalByBtnAndClick(this.closeByClickAndBtn);
		if (this.helpers) this.#runHelperFunctions(this.helpers, evt);
	}

	#createModal(currentClientWidth) {
		this.#removeAnimationClasses(
			this.wrapper,
			this.showModalWrapperAnimation,
			this.hideModalWrapperAnimation
		);
		this.#removeAnimationClasses(this.modal, this.showModalAnimation, this.hideModalAnimation);
		const cWidth = document.body.clientWidth;
		this.wrapper.style.display = "block";
		this.wrapper.classList.add(this.showModalWrapperAnimation);
		this.modal.classList.add(this.showModalAnimation);
		document.body.style.paddingRight = `${cWidth - currentClientWidth}px`;
	}

	#closeModal() {
		this.#removeAnimationClasses(this.modal, this.showModalAnimation, this.hideModalAnimation);
		this.modal.classList.add(this.hideModalAnimation);
		setTimeout(() => {
			this.#removeAnimationClasses(
				this.wrapper,
				this.showModalWrapperAnimation,
				this.hideModalWrapperAnimation
			);
			this.wrapper.classList.add(this.hideModalWrapperAnimation);
			setTimeout(() => {
				this.wrapper.style.display = "none";
				document.body.style.overflow = null;
				document.body.style.position = null;
				document.body.style.paddingRight = 0;
			}, 200);
		}, 250);
	}

	#closeModalByEscButton(escButton = false) {
		window.addEventListener("keydown", evt => {
			if (evt.key === "Escape" && escButton) this.#closeModal(true);
		});
	}

	#closeModalByBtnAndClick(click = true) {
		this.wrapper.addEventListener("click", evt => {
			if (click && (evt.target === this.wrapper || evt.target === this.closeModal)) {
				this.#closeModal();
			}
		});
	}

	// eslint-disable-next-line default-param-last
	#showModalByTimer(timer = false, time) {
		if (timer) {
			setTimeout(() => {
				this.showModal();
			}, time);
		}
	}

	// eslint-disable-next-line default-param-last
	#showModalByScroll(scroll = false, scrolledBy) {
		window.addEventListener("scroll", () => {
			const scrollTopVal = document.documentElement.scrollTop;
			if (!this.modalTriggered && scroll && scrollTopVal > scrolledBy) {
				this.showModal();
			}
		});
	}

	#removeAnimationClasses(element, ...classNames) {
		const classes = classNames;
		for (const elementClass of classes) {
			if (element.classList.contains(elementClass)) element.classList.remove(elementClass);
		}
	}

	#runHelperFunctions(helpers, evt) {
		const [preSelectLevelOption] = helpers;
		preSelectLevelOption(evt.target.getAttribute("data-level"));
	}
}

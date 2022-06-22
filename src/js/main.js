import "../sass/main.sass";
import "swiper/css";

import Swiper, { Mousewheel, Keyboard, Autoplay } from "swiper";
import Modal from "./modules/modal";
import Forms from "./modules/forms";
import FormValidation from "./modules/formValidation";

Swiper.use([Mousewheel, Keyboard, Autoplay]);

window.addEventListener("load", () => {
	const newCollectionSlider = new Swiper(".NewCollectionSlider", {
		wrapperClass: "Slider-Wrapper",
		slideClass: "Slider-Slide",
		slidesPerView: 4,
		spaceBetween: 0,
		grabCursor: true,
		mousewheel: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		direction: "horizontal",
		loop: true,
		autoplay: {
			delay: 2000
		},
		breakpoints: {
			2400: {
				slidesPerView: 5,
				spaceBetween: 0
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 0
			},
			600: {
				slidesPerView: 3,
				spaceBetween: 0
			},
			400: {
				slidesPerView: 2,
				spaceBetween: 0
			},
			200: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		}
	});

	const newsSlider = new Swiper(".NewsSlider", {
		wrapperClass: "Slider-Wrapper",
		slideClass: "Slider-Slide",
		slidesPerView: 3,
		spaceBetween: 0,
		grabCursor: true,
		mousewheel: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		direction: "horizontal",
		loop: true,
		autoplay: {
			delay: 2000,
			reverseDirection: true
		},
		breakpoints: {
			880: {
				slidesPerView: 3
			},
			600: {
				slidesPerView: 2
			},
			300: {
				slidesPerView: 1
			},
			200: {
				slidesPerView: 1,
				centerInsufficientSlides: true
			}
		}
	});

	const modal = new Modal({
		triggerBtns: "[data-open-modal]",
		modalSelector: ".Modal",
		modalWrapperSelector: ".Modal-Wrapper",
		showAnimationClass: "FadeInTopModal",
		hideAnimationClass: "FadeOutTopModal",
		showModalWrapperClass: "FadeInWrapper",
		hideModalWrapperClass: "FadeOutWrapper",
		closeModalTriggerBtn: "[data-single-item-modal='close-modal']",
		closeModalWindowByEsc: true,
		closeModalWindowByClickAndBtn: true
	});

	const modalForm = new Forms({
		triggerForm: "#ModalForm",
		databaseName: "feedback",
		spinnerSrc: "../img/bar.svg",
		sendDataButton: "#ModalFormSendData",
		submitButton: "[data-modalFormSendData]",
		leftCoordinates: 48.5
	});

	const formValidation = new FormValidation({
		submitButton: "[data-modalFormSendData]",
		formInputs: "[data-modalFormInput]",
		usernameInput: "[data-input='username']",
		surnameInput: "[data-input='surname']",
		emailInput: "[data-input='email']",
		messageThemeInput: "[data-input='messageTheme']",
		messageInput: "[data-input='message']"
	});

	newCollectionSlider.init();
	newsSlider.init();
	modal.init();
	modalForm.init();
	formValidation.init();
});

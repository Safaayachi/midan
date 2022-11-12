import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Carousel = () => {
	const { t } = useTranslation(["common", "button", "home", "auth"]);
	const [index, setIndex] = useState(0);
	const [index1, setIndex1] = useState(1);
	const [trans, setTrans] = useState(false);
	const [transR, setTransR] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	useEffect(() => {
		if (transR) {
			setTimeout(() => {
				setTransR(false);
			}, 700);
		}

		if (trans) {
			setTimeout(() => {
				setTrans(false);
				setIndex((index + 1) % images.length);
				setIndex1((index1 + 1) % images.length);
			}, 800);
		}
	}, [trans, transR]);

	const images = [
		{ name: "food1.png" },
		{ name: "food2.png" },
		{ name: "food3.png" },
		{ name: "food1.png" },
		{ name: "food2.png" },
	];

	const handlePrev = () => {
		setTransR(true);
		setTrans(false);
		const nextIndex = index - 1;
		const nextIndex1 = index1 - 1;

		if (nextIndex1 < 0) {
			setIndex1(images.length - 1);
		} else {
			setIndex1(nextIndex1);
		}

		if (nextIndex < 0) {
			setIndex(images.length - 1);
		} else {
			setIndex(nextIndex);
		}
	};
	const handleNext = () => {
		setTrans(true);
		setTransR(false);
	};

	const handleImgClick = (idx) => {
		setActiveIndex(idx);
		if (idx === index) {
			return;
		}
		if (idx < index) {
			setIndex(idx);
			setIndex1(idx + 1);
			setTransR(true);
			setTrans(false);
		} else {
			setIndex((idx - 1) % images.length);
			setIndex1(idx % images.length);
			handleNext();
		}
	};
	return (
		<>
			<>
				{images.length > 0 ? (
					<>
						<div className="flex justify-center space-x-4 py-6 px-8 ">
							<button
								className="h-auto w-10 text-dark-tint font-semibold text-xl hover:text-white"
								onClick={handlePrev}
							>
								{"<"}
							</button>
							<div className="flex w-full h-full flex-row gap-10">
								<div className="relative w-4/6 overflow-hidden ">
									<Image
										className={`absolute p-4 z-10 w-full h-full ${
											trans
												? "transition duration-500 ease-linear transform -translate-x-full"
												: transR
												? "transition duration-500 ease-linear transform -translate-x-full"
												: ""
										}`}
										src={`/images/${images[index].name}`}
										alt=""
										layout="fill"
										objectFit="cover"
									/>
								</div>
								<div className="flex w-2/6 flex-col px-8 pr-16 space-y-8 py-52">
									<div className="text-white">
										{t("common:book-now")}
									</div>
									<div className="text-white">
										{t("common:book-now")}
									</div>
									<div className="text-white">
										{t("common:book-now")}
									</div>
									<button className="btn border-primary text-primary  py-3 w-full md:w-40  cursor-pointer">
										{t("common:book-now")}
									</button>
								</div>
							</div>
							<button
								className="h-auto w-10 text-dark-tint font-semibold text-xl hover:text-white"
								onClick={handleNext}
							>
								{">"}
							</button>
						</div>
					</>
				) : (
					"no images yet"
				)}
			</>
		</>
	);
};

export default Carousel;

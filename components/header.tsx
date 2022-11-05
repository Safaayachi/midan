import { Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";
import AuthDrop from "./authDrop";
import Language from "./language";
const Header = () => {
	const { t } = useTranslation(["common", "button", "home","auth"]);
	return (
		<Fragment>
			<header>
				<nav className="relative flex  items-center container sm:mx-auto z-10 py-3 px-6 justify-between">
					<div className="flex gap-2">
						<Link passHref href={"/"}>
							<div className="btn border-primary text-primary text-xs py-1 px-6 cursor-pointer">
								{t("common:contact-us")}
							</div>
						</Link>
						<AuthDrop/>
					</div>
					<div className="flex flex-row gap-10 items-center text-center ">
						<Language />
						<Link passHref href={"/"}>
							<div className="cursor-pointer w-full font-bold text-xs py-5">
								{t("common:home")}
							</div>
						</Link>
						<Link passHref href={"/"}>
							<div className="cursor-pointer w-full font-bold text-xs py-5">
								{t("common:review")}
							</div>
						</Link>
						<Link passHref href={"/"}>
							<div className="cursor-pointer w-full font-bold text-xs py-5">
								{t("common:rooms")}
							</div>
						</Link>
					</div>

					<Link passHref href={"/"}>
						<div className={`relative cursor-pointer`}>
							<Image
								alt={"midan-logo"}
								src={"/images/midan.png"}
								width={50}
								height={50}
							></Image>
						</div>
					</Link>
				</nav>
			</header>
		</Fragment>
	);
};
export default Header;

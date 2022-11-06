import { useTranslation } from "next-i18next";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
	const { t }: { t: any } = useTranslation([
		"common",
		"button",
		"home",
		"privacy",
		"terms",
		"input",
	]);
	return (
		<footer className="w-full relative bg-secondary text-white">
			<div className="w-full container sm:mx-auto px-6 lg:px-10 pt-6 lg:pt-10 ">
				<div className="flex flex-col  lg:grid lg:grid-cols-4 gap-6 pb-8">
					<div className="flex flex-col justify-center items-center gap-4 py-6  pb-8">
						<div className={`relative cursor-pointer`}>
							<Image
								alt={"midan-logo"}
								src={"/images/logo-white.png"}
								width={50}
								height={50}
							></Image>
						</div>
						<div className="text-xs">{t("home:midan-waiting")}</div>
						<div className="btn border-white py-2 px-0 w-24">
							{t("common:book-now")}
						</div>
					</div>
					<div className="flex flex-col gap-2 justify-center items-center lg:items-start lg:justify-start">
						<h2 className="font-bold text-lg mb-2">
							{t("common:pages")}
						</h2>
						<h3 className="text-xs">
							{t("privacy:privacy-policy")}
						</h3>
						<Link passHref href={"/"}>
							<h3 className="text-xs">
								{t("terms:terms-of-use")}
							</h3>
						</Link>
						<Link passHref href={"/"}>
							<h3 className="text-xs">{t("common:review")}</h3>
						</Link>
						<Link passHref href={"/"}>
							<h3 className="text-xs">{t("common:rooms")}</h3>
						</Link>
						<Link passHref href={"/"}>
							<h3 className="text-xs">{t("common:book-now")}</h3>
						</Link>
						<Link passHref href={"/"}>
							<h3 className="text-xs">{t("common:arabic")}</h3>
						</Link>
					</div>
					<div className="flex flex-col gap-2 justify-center items-center lg:items-start lg:justify-start">
						<h2 className="font-bold text-lg mb-2">
							{t("common:contact-us")}
						</h2>
						<div className="flex flex-row gap-1 items-center">
							<i className="icon-fullscreen_black_24dp text-lg text-white"></i>
							<div className="text-sm font-bold">
								{t("home:address")}
							</div>
						</div>
						<h3 className="text-xs text-dark-tint">
							{t("home:address-description")}
						</h3>
						<div className="flex flex-row gap-4 py-5">
							<div className="flex flex-row gap-1 items-center">
								<i className="icon-call_black_24dp-3 text-lg text-white"></i>
								<div className="text-xs">+966 530 301 827</div>
							</div>
							<div className="flex flex-row gap-1 items-center">
								<i className="icon-call_black_24dp-3 text-lg text-white"></i>
								<div className="text-xs">+966 530 301 827</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 justify-center items-center lg:items-start lg:justify-start">
						<h2 className="font-bold text-lg mb-2">
							{t("input:subscribe-newsletter")}
						</h2>
						<h3 className="text-xs py-1">
							{t("input:newsletter-label")}
						</h3>
						<div className="relative py-1">
							<input
								type="email"
								className="border-white placeholder-gray-600 py-2 "
								placeholder={t("input:email")}
							/>
							<i className="icon-call_black_24dp-3 text-lg text-white absolute rtl:left-2.5 ltr:right-2.5 top-1.5"></i>
						</div>
						<div className="flex flex-row gap-2">
							<Link passHref href={"/"}>
								<i className="icon-icons8-facebook text-xs text-white cursor-pointer"></i>
							</Link>
							<Link passHref href={"/"}>
								<i className="icon-Group-48 text-xs text-white cursor-pointer"></i>
							</Link>
							<Link passHref href={"/"}>
								<i className="icon-icons8-twitter text-xs text-white cursor-pointer"></i>
							</Link>
							<Link passHref href={"/"}>
								<i className="icon-iconmonstr-snapchat-1 text-xs text-white cursor-pointer"></i>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="border-t-dark-tint border-t border-solid text-center text-dark-tint py-4 text-xs">
            Copyright &copy; {new Date().getFullYear()} Midan Hotel
            </div>
		</footer>
	);
};
export default Footer;

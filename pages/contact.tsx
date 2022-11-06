import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useForm } from "react-hook-form";
import HeadSeo from "../components/HeadSeo";
import Layout from "../components/layout";
import siteMetadata from "../data/siteMetadata";
import nextI18nextConfig from "../i18n/next-i18next.config";
import Link from "next/link";

const Contact: NextPage = () => {
	const { t } = useTranslation([
		"common",
		"button",
		"home",
		"input",
		"validation",
	]);
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		reValidateMode: "onChange",
		mode: "all",
	});
	return (
		<>
			<HeadSeo
				title={t("common:contact-title")}
				description={t("home:midan")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<section className="pt-16 md:pt-0 min-h-screen w-full">
					<div className="hidden md:block absolute -z-10 w-full h-screen">
						<div className="relative h-full w-full">
							<Image
								alt={"midan-cover"}
								src={"/images/auth-cover.png"}
								layout="fill"
								objectFit="cover"
							></Image>
						</div>
					</div>
					<div className="container sm:mx-auto px-6 lg:px-10 pt-20">
						<div className="h-full bg-white p-6 lg:p-10 flex flex-col md:flex-row gap-10">
							<div className="relative md:w-1/2">
								<iframe
									className="w-full h-4/5"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12939.492122698986!2d10.585889550000001!3d35.827590799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd8b3a0237010f%3A0x4418fc1f1a3cb73f!2sPolytechnique%20Sousse!5e0!3m2!1sar!2stn!4v1663583094761!5m2!1sar!2stn"
								></iframe>

								<div className="flex flex-row justify-between py-4">
									<div className="flex flex-col gap-2">
										<div className="text-sm font-bold">
											{t("home:address")}
										</div>

										<h3 className="text-xs text-dark-tint">
											{t("home:address-description")}
										</h3>
									</div>
									<div className="flex flex-col gap-2">
										<div className="flex flex-row gap-1 items-center">
											<i className="icon-call_black_24dp-3 text-sm font-bold"></i>
											<div className="text-xs">
												+966 530 301 827
											</div>
										</div>
										<div className="flex flex-row gap-1 items-center">
											<i className="icon-call_black_24dp-3 text-sm font-bold "></i>
											<div className="text-xs">
												+966 530 301 827
											</div>
										</div>
									</div>
									<div className="flex flex-row gap-2 items-center">
										<Link passHref href={"/"}>
											<i className="icon-icons8-facebook text-xs  cursor-pointer"></i>
										</Link>
										<Link passHref href={"/"}>
											<i className="icon-Group-48 text-xs  cursor-pointer"></i>
										</Link>
										<Link passHref href={"/"}>
											<i className="icon-icons8-twitter text-xs  cursor-pointer"></i>
										</Link>
										<Link passHref href={"/"}>
											<i className="icon-iconmonstr-snapchat-1 text-xs cursor-pointer"></i>
										</Link>
									</div>
								</div>
							</div>
							<div className="relative md:w-1/2 ">
								<div className="flex flex-row gap-6 items-center justify-center w-full">
									<div className="flex flex-row items-center">
										<div className="w-40 h-px bg-gradient-to-r from-primary via-primary-tint to-white"></div>
										<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
									</div>
									<div className="text-dark text-2xl font-bold">
										{t("common:contact-us")}
									</div>
									<div className="flex flex-row items-center">
										<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
										<div className="w-40 h-px bg-gradient-to-l from-primary via-primary-tint to-white"></div>
									</div>
								</div>
								<form className=" ">
									<div className="flex flex-col w-full gap-4">
										<div>
											<label
												htmlFor="name"
												className="text-xs"
											>
												{t("input:name")}*
											</label>
											<input id="name" type="text" />
										</div>
										<div>
											<label
												htmlFor="email"
												className="text-xs"
											>
												{t("input:email")}*
											</label>
											<input id="email" type="email" />
										</div>

										<div>
											<label
												htmlFor="topic"
												className="text-xs"
											>
												{t("input:topic")}*
											</label>
											<input id="topic" type="text" />
										</div>
										<div>
											<label
												htmlFor="problem"
												className="text-xs "
											>
												{t("input:problem")}*
											</label>
											<textarea
												className=" min-h-[150px] border"
												id="problem"
											></textarea>
										</div>
									</div>
									<div className="w-full flex justify-center">
										<button
											type="button"
											className="btn btn-primary px-10 py-4 w-full md:w-auto"
										>
											{t("button:send")}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};
export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input", "validation"],
				nextI18nextConfig
			)),
		},
	};
};
export default Contact;

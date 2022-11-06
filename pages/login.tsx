import Link from "next/link";
import Image from "next/image";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../i18n/next-i18next.config.js";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocalStorage } from "react-use";
import siteMetadata from "../data/siteMetadata";
import HeadSeo from "../components/HeadSeo";
type Inputs = {
	UserName: string;
	Password: string;
};
const Login: NextPage<{}> = () => {
	const { t } = useTranslation([
		"common",
		"home",
		"button",
		"validation",
		"auth",
	]);
	const [user, setUser, removeUser] = useLocalStorage("user");
	const [token, setToken, removeToken] = useLocalStorage("token", "" || null);
	const router = useRouter();
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<Inputs>({
		reValidateMode: "onChange",
		mode: "all",
	});
	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		if (isValid) {
			const options = {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			};
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API}/account/Login`,
					options
				);
				const data = await res.json();
				if (data.success) {
					setUser(data.user);
					setToken(data.token);
					if (router.query && router.query.from) {
						router.push({ pathname: "/hotels/booking-paiement/" });
					} else {
						router.push({ pathname: "/" });
					}
				}
			} catch (err) {}
		}
	};
	return (
		<>
			<HeadSeo
				title={t("auth:login")}
				description={t("home:midan")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout hasFooter={false} hasHeader={false}>
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
					<div className="absolute lg:w-11/12 md:m-auto md:flex md:justify-around items-center w-full h-full">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="bg-white px-10 py-6 gap-8 flex flex-col justify-center items-center md:items-start text-sm md:px-14 w-full md:w-full md:max-w-xl lg:max-w-2xl h-full"
						>
							<div className="text-4xl font-bold ">
								{t("auth:login")}
							</div>
							<p className="flex gap-2 justify-center items-center ">
								<div className="text-secondary font-bold">
									{t("auth:dont-have-account")}
								</div>
								<Link href="/register" passHref>
									<div className="underline text-primary cursor-pointer">
										{t("auth:register")}
									</div>
								</Link>
							</p>
							<div className="space-y-4 w-full">
								<div>
									<div className="flex text-start ">
										<label
											htmlFor="email"
											className="block text-dark font-semibold"
										>
											{t("input:email")}
										</label>
									</div>
									<input
										type="email"
										id="email"
										{...register("UserName", {
											required: true,
										})}
									/>
									{errors.UserName && (
										<div className="text-danger text-xxs">
											{t("validation:fill-all-fields")}
										</div>
									)}
								</div>
								<div>
									<div className="flex text-start">
										<label
											htmlFor="password"
											className=" text-dark font-semibold"
										>
											{t("input:password")}
										</label>
									</div>
									<input
										type="password"
										id="password"
										{...register("Password", {
											required: true,
										})}
									/>
									{errors.Password && (
										<div className="text-danger text-xxs">
											{t("validation:fill-all-fields")}
										</div>
									)}
								</div>
								<div className="text-start">
									<Link href="/forgot" passHref>
										<div className="text-xs hover:underline text-dark text-start font-bold cursor-pointer">
											{t("auth:did-you-forgot-password")}
										</div>
									</Link>
								</div>
							</div>
							<div className="flex flex-col md:flex-row justify-between w-full">
								<label
									className="flex gap-1 items-center text-xxs"
									htmlFor="notify-me"
								>
									<input
										id="notify-me"
										type="checkbox"
										className="form-checkbox rounded text-primary"
									/>
									<div>{t("input:remember-me")}</div>
								</label>
								<button
									type="button"
									className="btn btn-primary w-full px-6 md:w-auto "
								>
									{t("button:login")}
								</button>
							</div>

							<div className="flex flex-row gap-2 items-center justify-center w-full">
								<div className="flex flex-row items-center">
									<div className="w-40 h-px bg-gradient-to-r from-dark-tint via-dark-tint to-white"></div>
									<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
								</div>
								<div className="text-dark-tint text-xs">
									{t("auth:using-social-media")}
								</div>
								<div className="flex flex-row items-center">
									<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
									<div className="w-40 h-px bg-gradient-to-l from-dark-tint via-dark-tint to-white"></div>
								</div>
							</div>
							<div className="flex flex-col gap-4 w-full">
								<button
									type="button"
									className="btn border border-solid border-dark-tint "
								>
									<span className="font-bold">
										{t("button:sign-in-google")}
									</span>
                                    <div className="relative">
										<Image
											alt={"google-logo"}
											src={"/images/google.svg"}
											width={25}
											height={25}
										></Image>
									</div>
								</button>
								<button
									type="button"
									className="btn btn-info"
								>
									<span className="font-bold">
										{t("button:sign-in-facebook")}
									</span>
									<div className="relative">
										<Image
											alt={"facebook-logo"}
											src={"/images/facebook-icon.svg"}
											width={25}
											height={25}
										></Image>
									</div>
								</button>
							</div>
						</form>
						<div className="hidden md:block">
							<div className="relative">
								<Image
									alt={"midan-logo"}
									src={"/images/logo-white.png"}
									width={50}
									height={50}
								></Image>
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
				["common", "button", "home", "input", "validation", "auth"],
				nextI18NextConfig
			)),
		},
	};
};

export default Login;

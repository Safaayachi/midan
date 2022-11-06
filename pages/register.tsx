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
	FirstName: string;
	LastName: string;
};
const Register: NextPage<{}> = () => {
	const { t } = useTranslation([
		"common",
		"home",
		"button",
		"validation",
		"auth",
	]);
	const router = useRouter();
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
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
					`${process.env.NEXT_PUBLIC_API}/account/register`,
					options
				);
				const data = await res.json();
				if (data.success) {
					router.push("/auth/login");
				}
			} catch (err) {}
		}
	};
	return (
		<>
			<HeadSeo
				title={t("auth:register")}
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
								{t("auth:create-account")}
							</div>
							<div className="flex gap-4">
								<div className="relative">
									<Image
										alt={"midan-logo"}
										src={"/images/google.svg"}
										width={45}
										height={45}
									></Image>
								</div>
								<div className="relative">
									<Image
										alt={"midan-logo"}
										src={"/images/facebook-icon.svg"}
										width={45}
										height={45}
									></Image>
								</div>
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
							<div className="hidden md:block gap-3 ">
								<h3 className="font-bold  py-3">
									{t("auth:register-with-your-email")}
								</h3>
								<div className="flex flex-row gap-2">
									<div className="font-bold ">
										{t("auth:already-member")}
									</div>
									<Link passHref href={"/login"}>
										<div className="text-primary underline cursor-pointer">
											{t("auth:login")}
										</div>
									</Link>
								</div>
							</div>
							<div className="w-full">
								<div className="flex text-start">
									<label
										htmlFor="email"
										className="block  text-dark font-semibold"
									>
										{t("input:email")}
									</label>
								</div>
								<input
									type="email"
									id="email"
									{...register("UserName", {
										required: true,
										pattern:
											/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
									})}
								/>
								{errors.UserName && (
									<div className="text-danger text-xxs">
										{t("validation:fill-all-fields")}
									</div>
								)}
							</div>
							<div className="flex flex-col md:flex-row w-full  gap-4">
								<div className="w-full md:w-1/2">
									<div className="flex text-start">
										<label
											htmlFor="FirstName"
											className="block  text-dark font-semibold"
										>
											{t("input:first-name")}
										</label>
									</div>
									<input
										type="text"
										id="FirstName"
										{...register("FirstName", {
											required: true,
											pattern: /^[A-Za-z]+$/i,
										})}
									/>
									{errors.FirstName && (
										<div className="text-danger text-xxs">
											{t("validation:fill-all-fields")}
										</div>
									)}
								</div>
								<div className="w-full md:w-1/2">
									<div className="flex text-start">
										<label
											htmlFor="LastName"
											className="block text-dark font-semibold"
										>
											{t("input:last-name")}
										</label>
									</div>
									<input
										type="LastName"
										id="LastName"
										{...register("LastName", {
											required: true,
											pattern: /^[A-Za-z]+$/i,
										})}
									/>
									{errors.LastName && (
										<div className="text-danger text-xxs">
											{t("validation:fill-all-fields")}
										</div>
									)}
								</div>
							</div>
							<div className="w-full">
								<div className="flex text-start ">
									<label
										htmlFor="password"
										className=" text-dark font-semibold"
									>
										{t("input:password")}
									</label>
								</div>
								<div className="relative">
									<input
										type={`${
											isPasswordHidden
												? "password"
												: "text"
										}`}
										id="password"
										{...register("Password", {
											required: true,
										})}
									/>
									<i
										onClick={() =>
											setIsPasswordHidden(
												!isPasswordHidden
											)
										}
										className={`${
											isPasswordHidden
												? "icon-eye-crossed"
												: "icon-eye"
										} absolute rtl:left-4 ltr:right-4 top-[calc(50%-8px)] text-dark-tint`}
									></i>
								</div>
								{errors.Password && (
									<div className="text-danger text-xxs">
										{t("validation:fill-all-fields")}
									</div>
								)}
							</div>

							<div className="w-full flex justify-end">
								<button
									type="button"
									className="btn btn-primary px-6 w-full md:w-auto"
								>
									{t("button:sign-in")}
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

export default Register;

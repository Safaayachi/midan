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

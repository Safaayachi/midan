import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../i18n/next-i18next.config.js";
import HeadSeo from "../components/HeadSeo";
import siteMetadata from "../data/siteMetadata";
import Layout from "../components/layout";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { format, addDays } from "date-fns";
import { useLocalStorage } from "react-use";

const Home: NextPage<{}> = () => {
	const { t, i18n } = useTranslation(["home","common","button","validation","auth"]);
	return (
		<>
			<HeadSeo
				title={t("home:midan")}
				description={t("home:midan")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout><div></div></Layout>
			
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["home","common","button","validation","auth"],
				nextI18NextConfig
			)),
		},
	};
};
export default Home;

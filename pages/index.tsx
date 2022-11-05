import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../i18n/next-i18next.config.js";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { format, addDays } from "date-fns";
import { useLocalStorage } from "react-use";
const Home: NextPage<{}> = () => {
	const { t, i18n } = useTranslation(["home"]);
	return (
		<>
			<div className="font-bold text-5xl">{t("home:midan")}</div>
			<i className='icon-search_black_24dp-4 text-secondary self-end text-xl pb-1.5'></i>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["home"],
				nextI18NextConfig
			)),
		},
	};
};
export default Home;

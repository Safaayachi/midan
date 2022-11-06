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
import RoomsSearch from "../components/rooms-search";

const Home: NextPage<{}> = () => {
	const { t, i18n } = useTranslation([
		"home",
		"common",
		"button",
		"validation",
		"auth",
		"privacy",
		"terms",
		"input",
	]);
	const router = useRouter();
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		reValidateMode: "onChange",
		mode: "all",
	});
	const [
		chosenRoomsStorage,
		setChosenRoomsStorage,
		removeChosenRoomsStorage,
	] = useLocalStorage("chosenRooms", []);
	const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
		"guestInfo",
		{}
	);
	const [
		selectedHotelStorage,
		setSelectedHotelStorage,
		removeSelectedHotelStorage,
	] = useLocalStorage("selectedHotel", {});
	const handleGoToSearch = (data: any) => {
		router.push({
			pathname: "/search",
			query: data,
		});
		removeChosenRoomsStorage();
		removeGuestInfo();
		removeSelectedHotelStorage();
	};
	return (
		<>
			<HeadSeo
				title={t("home:midan")}
				description={t("home:midan")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<div className="pt-20">
					<div className="hidden container px-6 sm:mx-auto lg:flex">
						<div className="flex flex-row gap-10 justify-between">
							<div></div>
							<div></div>
						</div>
					</div>
					<div className="container px-6 sm:mx-auto pt-[33rem] 2xl:pt-[35rem] pb-28 md:px-10 h-full">
						<RoomsSearch goToSearch={handleGoToSearch} />
					</div>
				</div>
			</Layout>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				[
					"home",
					"common",
					"button",
					"validation",
					"auth",
					"privacy",
					"terms",
					"input",
				],
				nextI18NextConfig
			)),
		},
	};
};
export default Home;

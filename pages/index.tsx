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
import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";

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
	const [selectedIndex, setSelectedIndex] = useState(0);
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
					<div className="hidden container px-6 sm:mx-auto lg:flex ">
						<div className="flex flex-row gap-10 justify-between w-full h-full">
							<Tab.Group
								selectedIndex={selectedIndex}
								onChange={setSelectedIndex}
							>
								<Tab.Panels className="relative w-3/5 min-h-full max-h-full">
									<div>
										<Tab.Panel>
											<Image
												alt={"midan-cover"}
												src={"/images/tab4.png"}
												layout="fill"
												objectFit="cover"
											></Image>
										</Tab.Panel>
										<Tab.Panel>
											<Image
												alt={"midan-cover"}
												src={"/images/tab3.png"}
												layout="fill"
												objectFit="cover"
											></Image>
										</Tab.Panel>
										<Tab.Panel>
											<Image
												alt={"midan-cover"}
												src={"/images/tab2.png"}
												layout="fill"
												objectFit="cover"
											></Image>
										</Tab.Panel>
										<Tab.Panel>
											<Image
												alt={"midan-cover"}
												src={"/images/tab.png"}
												layout="fill"
												objectFit="cover"
											></Image>
										</Tab.Panel>
									</div>
								</Tab.Panels>
								<div className="py-40 w-2/5 pr-6">
									<div className="text-5xl font-extrabold py-2 px-1">
										{t("home:midan")}
									</div>
									<div className="text-2xl font-bold text-primary pb-2 px-1">
										{t("home:midan-will-take-care")}
									</div>
									<div className="flex flex-row items-center py-4">
										<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
										<div className="w-full h-px bg-gradient-to-l from-primary via-primary-tint to-white"></div>
									</div>
									<Tab.List className="flex flex-col gap-2 px-1">
										{selectedIndex == 0 ? (
											<div className="text-lg font-bold  pb-2 px-1">
												{t("home:details")}
											</div>
										) : selectedIndex == 1 ? (
											<div className="text-lg font-bold  pb-2 px-1">
												{t("home:decor")}
											</div>
										) : selectedIndex == 2 ? (
											<div className="text-lg font-bold  pb-2 px-1">
												{t("home:reunion")}
											</div>
										) : (
											<div className="text-lg font-bold  pb-2 px-1">
												{t("home:pool")}
											</div>
										)}
										<div className="flex gap-2 px-2">
											<Tab as={Fragment}>
												{({ selected }) => (
													<div
														className={`h-1.5 w-1.5 border border-solid border-primary rotate-45 ${
															selected
																? "bg-primary"
																: ""
														}`}
													></div>
												)}
											</Tab>
											<Tab as={Fragment}>
												{({ selected }) => (
													<div
														className={`h-1.5 w-1.5 border border-solid border-primary rotate-45 ${
															selected
																? "bg-primary"
																: ""
														}`}
													></div>
												)}
											</Tab>
											<Tab as={Fragment}>
												{({ selected }) => (
													<div
														className={`h-1.5 w-1.5 border border-solid border-primary rotate-45 ${
															selected
																? "bg-primary"
																: ""
														}`}
													></div>
												)}
											</Tab>
											<Tab as={Fragment}>
												{({ selected }) => (
													<div
														className={`h-1.5 w-1.5 border border-solid border-primary rotate-45 ${
															selected
																? "bg-primary"
																: ""
														}`}
													></div>
												)}
											</Tab>
										</div>
									</Tab.List>
								</div>
							</Tab.Group>
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

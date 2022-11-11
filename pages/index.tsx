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
														className={`h-1.5 w-1.5 border border-solid border-primary cursor-pointer rotate-45 ${
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
														className={`h-1.5 w-1.5 border border-solid border-primary cursor-pointer rotate-45 ${
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
														className={`h-1.5 w-1.5 border border-solid border-primary cursor-pointer rotate-45 ${
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
														className={`h-1.5 w-1.5 border border-solid border-primary cursor-pointer rotate-45 ${
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
					<div className="h-full">
						<RoomsSearch goToSearch={handleGoToSearch} />
					</div>
					<section className="w-full py-4 ">
						<div className="flex flex-row gap-10 items-center justify-center w-full py-12 container sm:mx-auto px-6  md:px-10">
							<div className="flex flex-row items-center w-1/6">
								<div className="w-full h-px bg-gradient-to-r from-primary via-white to-white"></div>
								<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
							</div>
							<div className="text-2xl font-bold">
								{t("home:get-to-know-us")}
							</div>
							<div className="flex flex-row items-center w-1/6">
								<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
								<div className="w-full h-px bg-gradient-to-l from-primary via-white to-white"></div>
							</div>
						</div>
						<div className="relative mb-10 container sm:mx-auto px-6">
							<iframe
								className="w-full aspect-video p-1"
								src="https://www.youtube.com/embed/qkkyLadgrw0"
								title="midan"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;picture-in-picture"
								allowFullScreen
							></iframe>
						</div>

						<div className="flex flex-col md:flex-row justify-center items-center gap-6 py-3 container sm:mx-auto">
							<div className="text-sm font-bold">
								{t("home:welcoming")}
							</div>
							<button className="btn border-primary text-primary  py-3 w-full md:w-40  cursor-pointer">
								{t("common:book-now")}
							</button>
						</div>
						<div className="flex w-full flex-col md:flex-row py-6">
							<div className="bg-primary flex flex-col  md:w-1/3 items-center py-4">
								<div className="flex flex-row gap-1 items-center">
									<i className="icon-fullscreen_black_24dp text-lg text-white"></i>
									<div className="text-sm font-bold text-white">
										{t("home:address")}
									</div>
								</div>
								<h3 className="text-xs text-white ">
									{t("home:address-description")}
								</h3>
							</div>

							<div className="flex flex-row gap-2 md:flex-col md:gap-0 md:w-1/3 bg-primary-tint md:bg-primary items-center justify-center py-3">
								<div className="flex flex-row gap-1 items-center">
									<i className="icon-call_black_24dp-3 text-lg text-white"></i>
									<div className="text-xs text-white">
										+966 530 301 827
									</div>
								</div>
								<div className="flex flex-row gap-1 items-center">
									<i className="icon-call_black_24dp-3 text-lg text-white"></i>
									<div className="text-xs text-white">
										+966 530 301 827
									</div>
								</div>
							</div>
							<div className="flex flex-row  md:flex-col gap-2 md:w-1/3 bg-primary-tint md:bg-primary items-center justify-center py-3">
								<div className="text-sm text-white text-center font-semibold">
									{t("common:follow-us")}
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
					</section>
					<section className="w-full container sm:mx-auto px-6  md:px-10 ">
						<div className="flex flex-row gap-10 items-center justify-center w-full py-4 container sm:mx-auto px-6  md:px-10">
							<div className="flex flex-row items-center w-1/6">
								<div className="w-full h-px bg-gradient-to-r from-primary via-white to-white"></div>
								<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
							</div>
							<div className="text-2xl font-bold">
								{t("common:services")}
							</div>
							<div className="flex flex-row items-center w-1/6">
								<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
								<div className="w-full h-px bg-gradient-to-l from-primary via-white to-white"></div>
							</div>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
							<div className="flex flex-col items-center gap-1">
								<i className="icon-fullscreen_black_24dp text-5xl text-primary cursor-pointer"></i>
								<div className="font-bold text-sm">
									{t("common:coffeeshop")}
								</div>
								<p className="text-xs">
									{t("home:get-to-know-us")}
								</p>
								<div className="flex flex-row gap-1 items-center text-xs text-primary font-bold">
									<div>5000</div>
									<i className="icon-call_black_24dp-3 "></i>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<i className="icon-fullscreen_black_24dp text-5xl text-primary cursor-pointer"></i>
								<div className="font-bold text-sm">
									{t("common:resturant")}
								</div>
								<p className="text-xs">
									{t("home:get-to-know-us")}
								</p>
								<div className="flex flex-row gap-1 items-center text-xs text-primary font-bold">
									<div>5000</div>
									<i className="icon-call_black_24dp-3 "></i>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<i className="icon-fullscreen_black_24dp text-5xl text-primary cursor-pointer"></i>
								<div className="font-bold text-sm">
									{t("common:sport")}
								</div>
								<p className="text-xs">
									{t("home:get-to-know-us")}
								</p>
								<div className="flex flex-row gap-1 items-center text-xs text-primary font-bold">
									<div>5000</div>
									<i className="icon-call_black_24dp-3 "></i>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<i className="icon-fullscreen_black_24dp text-5xl text-primary cursor-pointer"></i>
								<div className="font-bold text-sm">
									{t("common:laundry")}
								</div>
								<p className="text-xs">
									{t("home:get-to-know-us")}
								</p>
								<div className="flex flex-row gap-1 items-center text-xs text-primary font-bold">
									<div>5000</div>
									<i className="icon-call_black_24dp-3 "></i>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<i className="icon-fullscreen_black_24dp text-5xl text-primary cursor-pointer"></i>
								<div className="font-bold text-sm">
									{t("common:wifi")}
								</div>
								<p className="text-xs">
									{t("home:get-to-know-us")}
								</p>
								<div className="flex flex-row gap-1 items-center text-xs text-primary font-bold">
									<div>5000</div>
									<i className="icon-call_black_24dp-3 "></i>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<i className="icon-fullscreen_black_24dp text-5xl text-primary cursor-pointer"></i>
								<div className="font-bold text-sm">
									{t("common:the-pool")}
								</div>
								<p className="text-xs">
									{t("home:get-to-know-us")}
								</p>
								<div className="flex flex-row gap-1 items-center text-xs text-primary font-bold">
									<div>5000</div>
									<i className="icon-call_black_24dp-3 "></i>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<i className="icon-fullscreen_black_24dp text-5xl text-primary cursor-pointer"></i>
								<div className="font-bold text-sm">
									{t("common:room-services")}
								</div>
								<p className="text-xs">
									{t("home:get-to-know-us")}
								</p>
								<div className="flex flex-row gap-1 items-center text-xs text-primary font-bold">
									<div>5000</div>
									<i className="icon-call_black_24dp-3 "></i>
								</div>
							</div>
							<div className="flex flex-col items-center gap-1">
								<i className="icon-fullscreen_black_24dp text-5xl text-primary cursor-pointer"></i>
								<div className="font-bold text-sm">
									{t("common:kindergarten")}
								</div>
								<p className="text-xs">
									{t("home:get-to-know-us")}
								</p>
								<div className="flex flex-row gap-1 items-center text-xs text-primary font-bold">
									<div>5000</div>
									<i className="icon-call_black_24dp-3 "></i>
								</div>
							</div>
						</div>
					</section>
					<div className="flex flex-row gap-10 items-center justify-center w-full py-4 container sm:mx-auto px-6  md:px-10">
						<div className="flex flex-row items-center w-1/6">
							<div className="w-full h-px bg-gradient-to-r from-primary via-white to-white"></div>
							<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
						</div>
						<div className="text-2xl font-bold">
							{t("common:resturant")}
						</div>
						<div className="flex flex-row items-center w-1/6">
							<div className="h-1.5 w-1.5 border border-solid border-primary rotate-45"></div>
							<div className="w-full h-px bg-gradient-to-l from-primary via-white to-white"></div>
						</div>
					</div>
					<section className="w-full container sm:mx-auto px-6  md:px-10 py-6">
						<div className="flex flex-col">
							<div className="text-2xl text-primary font-bold py-4">
								{t("common:resturant-description")}
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
								<div className="relative  h-[400px]">
									<Image
										alt={"midan-cover"}
										src={"/images/food1.png"}
										layout="fill"
										objectFit="cover"
									></Image>
								</div>
								<div className="relative  h-[400px]">
									<Image
										alt={"midan-cover"}
										src={"/images/food2.png"}
										layout="fill"
										objectFit="cover"
									></Image>
								</div>
								<div className="relative  h-[400px]">
									<Image
										alt={"midan-cover"}
										src={"/images/food3.png"}
										layout="fill"
										objectFit="cover"
									></Image>
								</div>
								<div className="relative  h-[400px]">
									<Image
										alt={"midan-cover"}
										src={"/images/food4.png"}
										layout="fill"
										objectFit="cover"
									></Image>
									1
								</div>
							</div>
						</div>
					</section>
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

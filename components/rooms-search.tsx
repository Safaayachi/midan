import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { type } from "os";
import React, { useEffect, useState } from "react";
import DatePicker from "./date-picker";
import format from "date-fns/format";
import { addDays } from "date-fns";

type Props = {
	goToSearch: (_data: any) => void;
};
const RoomsSearch = ({ goToSearch }: Props) => {
	const { t } = useTranslation(["input", "button", "home"]);
	const router = useRouter();
	const [queriesObject, setQueriesObject] = useState<{
		checkin: string;
		checkout: string;
		city: number;
		promocode: string;
	}>({
		city: 0,
		checkin: router.query.checkin
			? (router.query.checkin as string)
			: format(addDays(new Date(), 1), "yyyy-MM-dd"),
		checkout: router.query.checkout
			? (router.query.checkout as string)
			: format(addDays(new Date(), 2), "yyyy-MM-dd"),
		promocode: router.query.promocode
			? (router.query.promocode as string)
			: "",
	});
	const handleChangeDate = (data: {
		startDate: number | Date;
		endDate: number | Date;
	}) => {
		setQueriesObject({
			...queriesObject,
			checkin: format(data.startDate, "yyyy-MM-dd"),
			checkout: format(
				data.endDate ? data.endDate : data.startDate,
				"yyyy-MM-dd"
			),
		});
	};
	useEffect(() => {
		setQueriesObject({
			...queriesObject,
			city: router.query.city ? Number(router.query.city) : 0,
			checkin: router.query.checkin
				? (router.query.checkin as string)
				: format(addDays(new Date(), 1), "yyyy-MM-dd"),
			checkout: router.query.checkout
				? (router.query.checkout as string)
				: format(addDays(new Date(), 2), "yyyy-MM-dd"),
			promocode: router.query.promocode
				? (router.query.promocode as string)
				: "",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query]);
	return (
		<div
			className={` flex flex-col lg:flex-row lg:justify-between  lg:shadow w-full p-2.5  bg-transparent lg:bg-secondary lg:py-6 lg:gap-6`}
		>
			<div className="w-full grid grid-cols-12 gap-4 lg:gap-0 ">
				<DatePicker
					chosenDates={{
						startDate: new Date(queriesObject.checkin),
						endDate: new Date(queriesObject.checkout),
					}}
					changeDate={handleChangeDate}
				/>

				<div
					className={`relative w-full px-6 flex flex-col lg:gap-1 items-start justify-center col-span-12 lg:col-span-3 py-2 lg:py-0 bg-white lg:bg-transparent rounded-full lg:rounded-none`}
				>
					<div className="flex justify-start items-center gap-3">
						<i className="icon-badge-percent text-white text-sm"></i>
						<div className="text-white text-xs">
							{t("input:promo-code")}
						</div>
					</div>
					<input
						className="p-0 lg:py-1 placeholder-dark-shade border-0 font-bold"
						type="text"
						placeholder={t("input:promo-code") + "..."}
						onChange={(event) =>
							setQueriesObject({
								...queriesObject,
								promocode: event.target.value,
							})
						}
						value={queriesObject.promocode}
					/>
				</div>
			</div>

			<button
				onClick={() => goToSearch(queriesObject)}
				className={`btn w-full border-secondary  lg:border-dark-tint lg:text-white px-2 lg:w-1/12 text-md font-bold mt-4 lg:mt-0 `}
			>
				<i className="icon-search_black_24dp-3 text-2xl"></i>
				{t("common:search")}
			</button>
		</div>
	);
};

export default RoomsSearch;

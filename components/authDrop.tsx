import { useTranslation } from "next-i18next";
import { Popover } from "@headlessui/react";
import React, { Fragment } from "react";
import Link from "next/link";

const AuthDrop = () => {
	const { t } = useTranslation(["common", "search", "auth"]);
	return (
		<Popover className="relative">
			<Popover.Button>
				<i className="icon-perm_identity_black_24dp text-2xl border border-solid border-primary rounded-full text-primary "></i>
			</Popover.Button>

			<Popover.Panel className="absolute z-10 pt-2">
				<div className="flex gap-2 flex-col shadow bg-white w-52 p-4">
					<label className="text-xs font-bold">
						{t(`common:join-us`)}
					</label>
					<Link passHref href={"/register"}>
						<div className="btn border-primary text-primary cursor-pointer text-xs">
							{t(`auth:register`)}
						</div>
					</Link>
					<label className="text-xs font-bold">
						{t(`auth:already-member`)}
					</label>
					<Link passHref href={"/login"}>
						<div className="btn border-primary text-primary cursor-pointer text-xs">
							{t(`auth:login`)}
						</div>
					</Link>
				</div>
			</Popover.Panel>
		</Popover>
	);
};
export default AuthDrop;

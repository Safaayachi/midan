import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Language = () => {
	const languages = [
		{ verbose: "arabic", value: "ar" },
		{ verbose: "english", value: "en" },
	];
	const router = useRouter();
	const { pathname, asPath, query, locale } = router;
	const { t, i18n } = useTranslation(["common", "home"]);
	const [selectedLanguage, setSelectedLanguage] = useState(locale);
	const changeLanguage = (language: string) => {
		setSelectedLanguage(language);
		router.push({ pathname, query }, asPath, { locale: language });
		i18n.changeLanguage(language);
	};
	return (
		<Fragment>
			<div
				onClick={() => {
					changeLanguage(i18n.language === "ar" ? "en" : "ar");
				}}
				className="flex items-center text-center cursor-pointer gap-2"
			>
				{i18n.language === "ar" ? (
					<span className="fi fi-sa text-xxs"></span>
				) : (
					<span className="fi fi-gb text-xxs"></span>
				)}
				<div className="text-xs font-bold">{t(`common:language`)}</div>
			</div>
		</Fragment>
	);
};
export default Language;

import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../i18n/next-i18next.config.js";
import dynamic from "next/dynamic";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
	const AnyComponent = Component as any;
	return (
		<>
			<SWRConfig>
				<AnyComponent {...pageProps} />
			</SWRConfig>
		</>
	);
}

export default appWithTranslation(MyApp, nextI18NextConfig);

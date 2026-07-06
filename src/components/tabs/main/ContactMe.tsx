import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"

const CONTACT_WAYS = [
    { i18nKey: "mail", value: "martin.roncero.l@gmail.com" },
    { i18nKey: "linkdin", value: "https://www.linkedin.com/in/martin-roncero" },
    { i18nKey: "github", value: "https://github.com/roncers" },
] as const
// TODO: use stylized labels for the titles of each contact way.

export default function ContactMe(props: TabComponentProps) {
    const { t } = useTranslation()

    return (
        <PoppingWindow {...props}>
            <section
                data-name="entry-point"
                className="data-container w-full h-full flex flex-col gap-4"
            >
                <section data-name="intro">
                    <h1 className="default-header-1">{t("info.contact.title")}</h1>
                </section>
                <section data-name="contact-list">
                    <ul className="default-description flex flex-col items-start gap-4">
                        {CONTACT_WAYS.map(({ i18nKey, value }) => {
                            const isMail = i18nKey === "mail";
                            const hrefValue = isMail ? `mailto:${value}` : value;

                            return (
                                <li key={i18nKey}>
                                    {t(`info.contact.${i18nKey}`)}:{" "}
                                    <a
                                        className="default-anchor"
                                        href={hrefValue}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        {value}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </section>
        </PoppingWindow>
    )
}
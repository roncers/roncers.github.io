import type { TabComponentProps } from "@/types/tab.types"
import { useTranslation } from "@/i18n/useTranslation"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import styles from "./ContactMe.module.css"

const CONTACT_WAYS = [
    { i18nKey: "mail", value: "martin.roncero.l@gmail.com" },
    { i18nKey: "linkdin", value: "https://www.linkedin.com/in/martin-roncero" },
    { i18nKey: "github", value: "https://github.com/roncers" },
] as const

const SHINE_COLORS: Record<string, React.CSSProperties> = {
    mail: {
        "--_shine-1": "#4285F4",
        "--_shine-2": "#EA4335",
        "--_shine-3": "#FBBC05",
        "--_shine-4": "#34A853",
    } as React.CSSProperties,
    linkdin: { "--_shine": "#0A66C2" } as React.CSSProperties,
    github: { "--_shine": "grey" } as React.CSSProperties,
}

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
                        {CONTACT_WAYS.map(({ i18nKey, value }, index) => {
                            const isMail = i18nKey === "mail";
                            const hrefValue = isMail ? `mailto:${value}` : value;

                            return (
                                <li key={i18nKey} className="flex flex-col gap-1">
                                    <label
                                        htmlFor={i18nKey}
                                        style={{ "--_delay": `${index * 2}s`, ...SHINE_COLORS[i18nKey] } as React.CSSProperties}
                                        className={`default-label ${styles.animate}`}
                                    >
                                        {t(`info.contact.${i18nKey}`)}
                                    </label>
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
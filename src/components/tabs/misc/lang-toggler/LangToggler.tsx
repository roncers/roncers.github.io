import PoppingWindow from "@/components/commons/poping-window/PoppingWindow";
import type { TabComponentProps } from "@/types/internal-tab.types";
import { useTranslation } from "@/i18n/useTranslation";
import type { Locale } from "@/i18n";
import styles from "./LangToggler.module.css";

const LOCALES: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "es", label: "ES" },
];

export default function LangToggler({ ...props }: TabComponentProps) {
  const { locale, setLocale, t } = useTranslation();
  return (
    <PoppingWindow {...props}>
      <section className="data-container w-full h-full flex flex-col gap-4">
        <h2 className="default-header-1">
          {t("info.miscellaneous.langToggler.title")}
        </h2>
        <div className={styles.container}>
          {LOCALES.map(({ locale: option }) => (
            <div className="flex items-center gap-4 flex-col" key={option}>
              <button
                key={option}
                id={`lang-${option}`}
                type="button"
                aria-label={option}
                aria-pressed={locale === option}
                className={`${styles.dot} ${locale === option ? styles.active : ""}`}
                onClick={() => setLocale(option)}
              />
              <label htmlFor={`lang-${option}`} className="text-sm uppercase">
                {option}
              </label>
            </div>
          ))}
        </div>
      </section>
    </PoppingWindow>
  );
}

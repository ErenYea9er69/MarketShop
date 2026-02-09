"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"

// Import translations
import en from "@/locales/en.json"
import fr from "@/locales/fr.json"
import ar from "@/locales/ar.json"

export type Language = "en" | "fr" | "ar"

const translations = { en, fr, ar }

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
    dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en")
    const [isLoaded, setIsLoaded] = useState(false)

    // Load language from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language
        if (savedLang && ["en", "fr", "ar"].includes(savedLang)) {
            setLanguageState(savedLang)
        }
        setIsLoaded(true)
    }, [])

    // Save language to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("language", language)
            // Update document direction for RTL
            document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
            document.documentElement.lang = language
        }
    }, [language, isLoaded])

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang)
    }, [])

    // Translation function with dot notation support
    const t = useCallback((key: string): string => {
        const keys = key.split(".")
        let value: unknown = translations[language]

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = (value as Record<string, unknown>)[k]
            } else {
                // Fallback to English if key not found
                value = translations.en
                for (const fallbackKey of keys) {
                    if (value && typeof value === "object" && fallbackKey in value) {
                        value = (value as Record<string, unknown>)[fallbackKey]
                    } else {
                        return key // Return key if not found
                    }
                }
                break
            }
        }

        return typeof value === "string" ? value : key
    }, [language])

    const dir = language === "ar" ? "rtl" : "ltr"

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}

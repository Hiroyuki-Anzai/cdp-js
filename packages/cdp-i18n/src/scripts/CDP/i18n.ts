﻿/// <reference path="../@types/i18next.d.ts" />
/* tslint:disable:max-line-length */

namespace CDP {

    import Promise = CDP.Promise;
    import I18next = i18next.i18n;

    export namespace I18N {
        export type I18n = I18next.i18n;
        export type Options = I18next.InitOptions & { [keys: string]: any };
        export type TranslationOptions = I18next.TranslationOptions;
        export type TranslationFunction = I18next.TranslationFunction;
        export type InterpolationOptions = I18next.InterpolationOptions;
    }

    const TAG = "[CDP.i18n] ";

    /**
     * @en Direct accessor for i18next object.
     * @ja i18next へのダイレクトアクセス
     */
    export let i18n: I18N.I18n;

    /**
     * @en Options interface for localize settings
     * @ja ローカライズ設定用オプション
     */
    export interface I18NSettings {
        /**
         * @es fallback string resource setting when automatic resolution failed.
         * @ja 自動解決できなかったときに使用するリソース
         *
         * @example <br>
         *
         * ```ts
         *  en: {
         *      messages: "/res/locales/messages.en-US.json",
         *  },
         *  ja: {
         *      messages: "/res/locales/messages.ja-JP.json",
         *  },
         * ```
         */
        fallbackResources?: { [lng: string]: { [ns: string]: string } };

        /**
         * @es set preload resource name
         * @ja preload するリソース指定
         *
         * @example <br>
         *
         * ```ts
         *  preload: [
         *      "en-US",
         *      "ja-JP",
         *  ],
         * ```
         */
        preload?: string[];

        /**
         * @es i18next raw options
         * @ja i18next が提供するオプション
         */
        options?: I18N.Options;
     }

    /**
     * @en initialize i18next. <br>
     *     It'll be usually called from framework.
     * @ja i18next の初期化 <br>
     *     通常は Framework が呼び出す。
     */
    export function initializeI18N(settings?: I18NSettings): IPromiseBase<any> {
        return new Promise((resolve, reject) => {
            const i18nSettings: I18NSettings = settings || {};
            i18nSettings.options = i18nSettings.options || {};

            try {
                const i18nOptions: I18N.Options = ((resources: { [lng: string]: { [ns: string]: string } }) => {
                    if (resources) {
                        for (const lng in resources) {
                            if (resources.hasOwnProperty(lng)) {
                                for (const ns in resources[lng]) {
                                    if (resources[lng].hasOwnProperty(ns)) {
                                        resources[lng][ns] = getLocaleFallbackResource(resources[lng][ns]);
                                    }
                                }
                            }
                        }
                        i18nSettings.options.resources = <any>resources;
                        return i18nSettings.options;
                    } else {
                        return i18nSettings.options;
                    }
                })(i18nSettings.fallbackResources);

                require(["jqueryI18next"], ($18Next: any) => {
                    require([
                        "i18next",
                        "i18nextXHRBackend",
                        "i18nextLocalStorageCache",
                        "i18nextSprintfPostProcessor",
                        "i18nextBrowserLanguageDetector",
                    ], (i18next: I18N.I18n
                        , Backend: any
                        , Cache: any
                        , PostProcessor: any
                        , LanguageDetector: any
                    ) => {
                            i18next
                                .use(Backend)
                                .use(Cache)
                                .use(PostProcessor)
                                .use(LanguageDetector)
                                .init(i18nOptions, (error: any, t: I18N.TranslationFunction) => {
                                    $18Next.init(i18next, $, {
                                        tName: "t",                         // --> appends $.t = i18next.t
                                        i18nName: "i18n",                   // --> appends $.i18n = i18next
                                        handleName: "localize",             // --> appends $(selector).localize(opts);
                                        selectorAttr: "data-i18n",          // selector for translating elements
                                        targetAttr: "i18n-target",          // data-() attribute to grab target element to translate (if diffrent then itself)
                                        optionsAttr: "i18n-options",        // data-() attribute that contains options, will load/set if useOptionsAttr = true
                                        useOptionsAttr: false,              // no use optionsAttr
                                        parseDefaultValueFromContent: true  // parses default values from content ele.val or ele.text
                                    });
                                    // i18next 3.4.1: resources が指定されると preload が読み込まれないため、再読み込み処理を行う.
                                    if (i18next.options.resources && i18next.options.preload) {
                                        // options からプロパティを一旦削除.
                                        const _preload = i18next.options.preload;
                                        const _resources = i18next.options.resources;
                                        delete i18next.options.resources;
                                        delete i18next.options.preload;
                                        i18next.loadLanguages(_preload, function () {
                                            // options を元に戻す
                                            i18next.options.resources = _resources;
                                            i18next.options.preload = _preload;
                                            CDP.i18n = i18next;
                                            resolve();
                                        });
                                    } else {
                                        CDP.i18n = i18next;
                                        resolve();
                                    }
                                });
                        });
                });
            } catch (e) {
                return reject(e);
            }
        });
    }

    /**
     * @es get string resource for fallback.
     * @js Fallback 用ローカライズリソースの取得
     *
     * @internal
     * @returns
     *   - `en` fallback resource object
     *   - `ja` fallback リソースオブジェクト
     */
    function getLocaleFallbackResource(path: string): any {
        let json: JSON;
        let error: ErrorInfo;
        $.ajax({
            url: CDP.toUrl(path),
            method: "GET",
            async: false,
            dataType: "json",
            success: (data: JSON) => {
                json = data;
            },
            error: (xhr: JQueryXHR, status: string) => {
                error = makeErrorInfo(
                    RESULT_CODE.ERROR_CDP_I18N_INITIALIZE_FAILED,
                    TAG,
                    "ajax request failed. status: " + status
                );
            }
        });

        if (null != error) {
            throw error;
        }

        return json;
    }
}

///////////////////////////////////////////////////////////////////////
// jquery-i18next extensions

interface JQueryStatic {
    i18n: CDP.I18N.I18n;
    t: (key: string, options?: CDP.I18N.Options) => string;
}

interface JQuery {
    localize: (options?: CDP.I18N.TranslationOptions) => JQuery;
}

///////////////////////////////////////////////////////////////////////
// cdp.i18n declaration

declare module "cdp.i18n" {
    export = CDP;
}

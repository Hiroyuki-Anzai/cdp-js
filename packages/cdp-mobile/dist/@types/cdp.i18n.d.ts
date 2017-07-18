﻿/*!
 * cdp.i18n.d.ts
 * This file is generated by the CDP package build process.
 *
 * Date: 2017-07-18T00:37:37.677Z
 */
/// <reference path="i18next.d.ts" />
/// <reference types="i18next" />
declare namespace CDP {
    import I18next = i18next.i18n;
    namespace I18N {
        type I18n = I18next.i18n;
        type Options = I18next.InitOptions;
        type TranslationOptions = I18next.TranslationOptions;
        type TranslationFunction = I18next.TranslationFunction;
        type InterpolationOptions = I18next.InterpolationOptions;
    }
    /**
     * i18next へのダイレクトアクセス
     */
    let i18n: I18N.I18n;
    /**
     * @interface I18NSettings
     * @brief ローカライズ設定用オプション
     */
    interface I18NSettings {
        fallbackResources?: {
            [lng: string]: {
                [ns: string]: string;
            };
        };
        preload?: string[];
        options?: I18N.Options;
    }
    /**
     * \~english
     * initialize i18next.
     *
     * \~japanese
     * i18next の初期化
     *
     * @private
     * @returns IPromiseBase オブジェクト
     */
    function initializeI18N(settings?: I18NSettings): IPromiseBase<any>;
}
interface JQueryStatic {
    i18n: CDP.I18N.I18n;
    t: (key: string, options?: CDP.I18N.Options) => string;
}
interface JQuery {
    localize: (options?: CDP.I18N.TranslationOptions) => JQuery;
}
declare module "cdp.i18n" {
    export = CDP;
}

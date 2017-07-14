﻿/*!
 * cdp.nativebridge.d.ts
 * This file is generated by the CDP package build process.
 *
 * Date: 2017-07-14T09:37:22.252Z
 */
/// <reference path="cdp.plugin.nativebridge.d.ts" />
/// <reference types="jquery" />
declare namespace CDP.NativeBridge {
    import Plugin = CDP.Plugin.NativeBridge;
    /**
     * \~english
     * @interface Feature
     * @brief feature information.
     *
     * \~japanese
     * @interface Feature
     * @brief 機能情報
     */
    interface Feature extends Plugin.Feature {
    }
    /**
     * \~english
     * @interface ConstructOptions
     * @brief NativeBridge class's consrtruction options.
     *
     * \~japanese
     * @interface ConstructOptions
     * @brief 初期化に指定するオプション
     */
    interface ConstructOptions extends Plugin.ConstructOptions {
        receiveParams?: boolean;
    }
    /**
     * \~english
     * @interface IResult
     * @brief NativeBridge base result information.
     *
     * \~japanese
     * @interface IResult
     * @brief NativeBridge の基底 Result 情報
     */
    interface IResult extends Plugin.IResult {
    }
    /**
     * \~english
     * @interface ExecOptions
     * @brief exec() method options.
     *
     * \~japanese
     * @interface ExecOptions
     * @brief exec() に渡すオプション
     */
    interface ExecOptions extends Plugin.ExecOptions {
        receiveParams?: boolean;
    }
}
declare module "cdp.nativebridge" {
    const NativeBridge: typeof CDP.NativeBridge;
    export = NativeBridge;
}
declare namespace CDP.NativeBridge {
    import IPromise = CDP.IPromise;
    /**
     * \~english
     * @class Utils
     * @brief The utility class for CDP.NativeBridge.
     *
     * \~japanese
     * @class Utils
     * @brief CDP.NativeBridge が使用するユーティリティクラス
     */
    class Utils {
        private static s_pluginReady;
        /**
         * \~english
         * Defines error code map from the plugin result to CDP.NativeBridge result code.
         *
         * @param errorCode [in] set result code string. ex): "SUCCESS_OK"
         *
         * \~japanese
         * plugin の Result Code を CDP.NativeBridge にマップする
         *
         * @param errorCode [in] Result Code 文字列を指定 ex): "SUCCESS_OK"
         */
        static defineResultCode(errorCode: string): void;
        /**
         * \~english
         * Wait for cordova "deviceready" event fired.
         *
         * \~japanese
         * cordova が 使用可能になるまで待機
         */
        static waitForPluginReady(): Promise<void>;
        /**
         * \~english
         * Create NativeBridge.Promise object from jQueryDeferred object.
         *
         * @param df [in] set jQueryDeferred instance.
         * @returns NativeBridge.Promise object.
         *
         * \~japanese
         * Promise オブジェクトの作成
         * jQueryDeferred オブジェクトから、NativeBridge.Promise オブジェクトを作成する
         *
         * @param df [in] jQueryDeferred instance を指定
         * @returns NativeBridge.Promise オブジェクト
         */
        static makePromise(df: JQueryDeferred<IResult>): IPromise<IResult>;
        /**
         * \~english
         * Helper function to correctly set up the prototype chain, for subclasses.
         * The function behavior is same as extend() function of Backbone.js.
         *
         * @param protoProps  [in] set prototype properties as object.
         * @param staticProps [in] set static properties as object.
         * @returns subclass constructor.
         *
         * \~japanese
         * クラス継承のためのヘルパー関数
         * Backbone.js extend() 関数と同等
         *
         * @param protoProps  [in] prototype properties をオブジェクトで指定
         * @param staticProps [in] static properties をオブジェクトで指定
         * @returns サブクラスのコンストラクタ
         */
        static extend(protoProps: Object, staticProps?: Object): Object;
    }
}
declare namespace CDP.NativeBridge {
    import IPromise = CDP.IPromise;
    import IPromiseBase = CDP.IPromiseBase;
    let SUCCESS_OK: number;
    let SUCCESS_PROGRESS: number;
    let ERROR_FAIL: number;
    let ERROR_CANCEL: number;
    let ERROR_INVALID_ARG: number;
    let ERROR_NOT_IMPLEMENT: number;
    let ERROR_NOT_SUPPORT: number;
    let ERROR_INVALID_OPERATION: number;
    let ERROR_CLASS_NOT_FOUND: number;
    let ERROR_METHOD_NOT_FOUND: number;
    /**
     * \~english
     * @class Gate
     * @brief The base class for NativeBridge communication.
     *        You can derive any Gate class from this class.
     *
     * \~japanese
     * @class Gate
     * @brief NativeBridge と通信するベースクラス
     *        このクラスから任意の Gate クラスを派生して実装可能
     */
    class Gate {
        private _bridge;
        private _options;
        private static extend;
        /**
         * \~english
         * constructor
         *
         * @param feature [in] feature information.
         * @param options [in] construction options.
         *
         * \~japanese
         * constructor
         *
         * @param feature [in] 初期化情報を指定
         * @param options [in] オプションを指定
         */
        constructor(feature: Feature, options?: ConstructOptions);
        /**
         * \~english
         * Execute task.
         * the function calls the Native class method from correspondent method name.
         *
         * @param method  [in] method name of Native class
         * @param args    [in] set arguments by array type.
         * @param options [in] set exec options.
         * @returns Promise object.
         *
         * \~japanese
         * タスクの実行
         * 指定した method 名に対応する Native Class の method を呼び出す。
         *
         * @param method  [in] Native Class のメソッド名を指定
         * @param args    [in] 引数を配列で指定
         * @param options [in] 実行オプションを指定
         * @returns Promise オブジェクト
         */
        exec(method: string, args?: any[], options?: ExecOptions): IPromise<any>;
        /**
         * \~english
         * Cancel all tasks.
         *
         * @param options [in] set execute options.
         * @returns Promise object.
         *
         * \~japanese
         * すべてのタスクのキャンセル
         *
         * @param options [in] 実行オプションを指定
         * @returns Promise オブジェクト
         */
        cancel(options?: ExecOptions): IPromiseBase<IResult>;
        /**
         * \~english
         * Destruction for the instance.
         * release Native class reference. after that, exec() becomes invalid.
         *
         * @param options [in] set execute options.
         * @returns Promise object.
         *
         * \~japanese
         * インスタンスの破棄
         * Native の参照を解除する。以降、exec は無効となる。
         *
         * @param options [in] 実行オプションを指定
         * @returns Promise オブジェクト
         */
        dispose(options?: ExecOptions): IPromiseBase<IResult>;
        /**
         * \~english
         * Access to Plugin.NativeBridge object.
         * If you want to use low level exec(), you can use this accessor.
         *
         * @returns Plugin.NativeBridge instance.
         *
         * \~japanese
         * Plugin.NativeBridge オブジェクトへのアクセス
         * 低レベル exec() を使用したい場合に利用可能
         *
         * @returns Plugin.NativeBridge インスタンス.
         */
        protected readonly bridge: Plugin.NativeBridge;
        private makeFatal();
    }
}

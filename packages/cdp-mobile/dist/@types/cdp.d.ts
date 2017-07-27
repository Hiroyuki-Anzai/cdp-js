﻿/*!
 * cdp.d.ts
 * This file is generated by the CDP package build process.
 *
 * Date: 2017-07-27T04:22:51.815Z
 */
/// <reference path="cdp.core.d.ts" />
/// <reference path="cdp.promise.d.ts" />
/// <reference path="cdp.nativebridge.d.ts" />
/// <reference path="cdp.i18n.d.ts" />
/// <reference path="cdp.framework.jqm.d.ts" />
/// <reference path="cdp.tools.d.ts" />
/// <reference path="cdp.ui.listview.d.ts" />
/// <reference path="cdp.ui.jqm.d.ts" />
/// <reference types="backbone" />
declare module "cdp/core/core" {
    import _core = require("cdp.core");
    export const global: any;
    export const coreInitialize: typeof _core.initialize;
    export const webRoot: string;
    export const Config: any;
    export type CoreInitOptions = _core.CoreInitOptions;
}
declare module "cdp/core/errors" {
    import _core = require("cdp.core");
    export type ErrorInfo = _core.ErrorInfo;
    export const makeErrorInfo: typeof _core.makeErrorInfo;
    export const makeCanceledErrorInfo: typeof _core.makeCanceledErrorInfo;
    export const isCanceledError: typeof _core.isCanceledError;
    export const ensureErrorInfo: typeof _core.ensureErrorInfo;
    export type RESULT_CODE = _core.RESULT_CODE;
    export const RESULT_CODE: typeof _core.RESULT_CODE;
    export const DECLARE_SUCCESS_CODE: typeof _core.DECLARE_SUCCESS_CODE;
    export const DECLARE_ERROR_CODE: typeof _core.DECLARE_ERROR_CODE;
    export const SUCCEEDED: typeof _core.SUCCEEDED;
    export const FAILED: typeof _core.FAILED;
    export const ASSIGN_RESULT_CODE: typeof _core.ASSIGN_RESULT_CODE;
    export const MODULE_RESULT_CODE_RANGE = 1000;
    export type RESULT_CODE_BASE = _core.RESULT_CODE_BASE;
    export const RESULT_CODE_BASE: typeof _core.RESULT_CODE_BASE;
    export const ASSIGN_RESULT_CODE_BASE: typeof _core.ASSIGN_RESULT_CODE_BASE;
}
declare module "cdp/core/promise" {
    import _promise = require("cdp.promise");
    export const makePromise: typeof _promise.makePromise;
    export const wait: typeof _promise.wait;
    export type PromiseManager = CDP.PromiseManager;
    export const PromiseManager: typeof _promise.PromiseManager;
    export type PromiseConstructor<T> = CDP.PromiseConstructor<T>;
    export const Promise: typeof _promise.PromiseConstructor;
    export type IPromiseBase<T> = CDP.IPromiseBase<T>;
    export type IPromise<T> = CDP.IPromise<T>;
}
declare module "cdp/core/i18n" {
    import _i18n = require("cdp.i18n");
    import i18n = CDP.i18n;
    export { i18n };
    export type I18NSettings = _i18n.I18NSettings;
}
declare module "cdp/core/framework.jqm" {
    export const waitForDeviceReady: typeof CDP.waitForDeviceReady;
    export const setBackButtonHandler: typeof CDP.setBackButtonHandler;
}
declare module "cdp/core" {
    export * from "cdp/core/core";
    export * from "cdp/core/errors";
    export * from "cdp/core/promise";
    export * from "cdp/core/i18n";
    export * from "cdp/core/framework.jqm";
}
declare module "cdp/framework/jqm" {
    export const Platform: {
        ltIE6: boolean;
        ltIE7: boolean;
        ltIE8: boolean;
        ltIE9: boolean;
        gtIE10: (mediaQuery: string) => MediaQueryList;
        Trident: any;
        Gecko: boolean;
        Presto: any;
        Blink: any;
        Webkit: boolean;
        Touch: boolean;
        Mobile: boolean;
        ltAd4_4: boolean;
        Pointer: any;
        MSPoniter: any;
        Android: boolean;
        iOS: boolean;
    };
    export const getOrientation: typeof CDP.Framework.getOrientation;
    export const toUrl: typeof CDP.Framework.toUrl;
    export const setBeforeRouteChangeHandler: typeof CDP.Framework.setBeforeRouteChangeHandler;
    export type Router = CDP.Framework.Router;
    export const Router: typeof CDP.Framework.Router;
    export const initialize: typeof CDP.Framework.initialize;
    export const isInitialized: typeof CDP.Framework.isInitialized;
    export const waitForInitialize: typeof CDP.Framework.waitForInitialize;
    export const registerOrientationChangedListener: typeof CDP.Framework.registerOrientationChangedListener;
    export const unregisterOrientationChangedListener: typeof CDP.Framework.unregisterOrientationChangedListener;
    export const getDefaultClickEvent: typeof CDP.Framework.getDefaultClickEvent;
    export const registerPage: typeof CDP.Framework.registerPage;
    export const constructPages: typeof CDP.Framework.constructPages;
    export const disposePages: typeof CDP.Framework.disposePages;
    export const setBackButtonHandler: typeof CDP.setBackButtonHandler;
    export type Page = CDP.Framework.Page;
    export const Page: typeof CDP.Framework.Page;
    export type Model = CDP.Framework.Model;
    export const Model: typeof Backbone.Model;
    export type Collection<TModel extends Model> = CDP.Framework.Collection<TModel>;
    export const Collection: typeof Backbone.Collection;
    export type View<TModel extends Model = Model> = CDP.Framework.View<TModel>;
    export const View: typeof Backbone.View;
    export type Events = CDP.Framework.Events;
    export const Events: typeof Backbone.Events;
    export type ModelSetOptions = CDP.Framework.ModelSetOptions;
    export type ModelFetchOptions = CDP.Framework.ModelFetchOptions;
    export type ModelSaveOptions = CDP.Framework.ModelSaveOptions;
    export type ModelDestroyOptions = CDP.Framework.ModelDestroyOptions;
    export type ViewOptions<TModel extends Model = Model> = CDP.Framework.ViewOptions<TModel>;
    export type Orientation = CDP.Framework.Orientation;
    export const Orientation: typeof CDP.Framework.Orientation;
    export type PageTransitionDirection = CDP.Framework.PageTransitionDirection;
    export type Intent = CDP.Framework.Intent;
    export type PageStack = CDP.Framework.PageStack;
    export type SubFlowParam = CDP.Framework.SubFlowParam;
    export type RouterOptions = CDP.Framework.RouterOptions;
    export type NavigateOptions = CDP.Framework.NavigateOptions;
    export type IOrientationChangedListener = CDP.Framework.IOrientationChangedListener;
    export type IBackButtonEventListener = CDP.Framework.IBackButtonEventListener;
    export type ICommandListener = CDP.Framework.ICommandListener;
    export type PageConstructOptions = CDP.Framework.PageConstructOptions;
    export type IPage = CDP.Framework.IPage;
    export type ShowEventData = CDP.Framework.ShowEventData;
    export type HideEventData = CDP.Framework.HideEventData;
    export type FrameworkOptions = CDP.Framework.FrameworkOptions;
}
declare module "cdp/framework" {
    import * as _errors from "cdp/core/errors";
    export * from "cdp/core/promise";
    export * from "cdp/framework/jqm";
    export { _errors as ErrorUtils };
    export type ErrorInfo = _errors.ErrorInfo;
    export const makeErrorInfo: typeof CDP.makeErrorInfo;
    export const makeCanceledErrorInfo: typeof CDP.makeCanceledErrorInfo;
    export const isCanceledError: typeof CDP.isCanceledError;
    export const ensureErrorInfo: typeof CDP.ensureErrorInfo;
    const _CDP_FRAMEWORK: typeof CDP.Framework;
    export default _CDP_FRAMEWORK;
}
declare module "cdp/tools/tools" {
    export module Blob {
        const arrayBufferToBlob: typeof CDP.Tools.Blob.arrayBufferToBlob;
        const base64ToBlob: typeof CDP.Tools.Blob.base64ToBlob;
        const base64ToArrayBuffer: typeof CDP.Tools.Blob.base64ToArrayBuffer;
        const base64ToUint8Array: typeof CDP.Tools.Blob.base64ToUint8Array;
        const arrayBufferToBase64: typeof CDP.Tools.Blob.arrayBufferToBase64;
        const uint8ArrayToBase64: typeof CDP.Tools.Blob.uint8ArrayToBase64;
        const URL: any;
    }
    export type DateTime = CDP.Tools.DateTime;
    export const DateTime: typeof CDP.Tools.DateTime;
    export const abs: typeof CDP.Tools.abs;
    export const max: typeof CDP.Tools.max;
    export const min: typeof CDP.Tools.min;
    export const toZeroPadding: typeof CDP.Tools.toZeroPadding;
    export const inherit: typeof CDP.Tools.inherit;
    export const mixin: typeof CDP.Tools.mixin;
    export const extend: typeof CDP.Tools.extend;
    export const getDevicePixcelRatio: typeof CDP.Tools.getDevicePixcelRatio;
    export type Template = CDP.Tools.Template;
    export const Template: typeof CDP.Tools.Template;
    export type JST = CDP.Tools.JST;
}
declare module "cdp/tools" {
    export * from "cdp/tools/tools";
    const _CDP_TOOLS: typeof CDP.Tools;
    export default _CDP_TOOLS;
}
declare module "cdp/ui/listview" {
    export const ListViewGlobalConfig: typeof CDP.UI.ListViewGlobalConfig;
    export type LineProfile = CDP.UI.LineProfile;
    export const LineProfile: typeof CDP.UI.LineProfile;
    export type GroupProfile = CDP.UI.GroupProfile;
    export const GroupProfile: typeof CDP.UI.GroupProfile;
    export const composeViews: typeof CDP.UI.composeViews;
    export const deriveViews: typeof CDP.UI.deriveViews;
    export const mixinViews: typeof CDP.UI.mixinViews;
    export type StatusManager = CDP.UI.StatusManager;
    export const StatusManager: typeof CDP.UI.StatusManager;
    export type PageProfile = CDP.UI.PageProfile;
    export const PageProfile: typeof CDP.UI.PageProfile;
    export type ScrollerElement = CDP.UI.ScrollerElement;
    export const ScrollerElement: typeof CDP.UI.ScrollerElement;
    export const ScrollerNative: typeof CDP.UI.ScrollerNative;
    export type ScrollerIScroll = CDP.UI.ScrollerIScroll;
    export const ScrollerIScroll: typeof CDP.UI.ScrollerIScroll;
    export type ListItemView<TModel extends Backbone.Model = Backbone.Model> = CDP.UI.ListItemView<TModel>;
    export const ListItemView: typeof CDP.UI.ListItemView;
    export type ScrollManager = CDP.UI.ScrollManager;
    export const ScrollManager: typeof CDP.UI.ScrollManager;
    export type ListView<TModel extends Backbone.Model = Backbone.Model> = CDP.UI.ListView<TModel>;
    export const ListView: typeof CDP.UI.ListView;
    export type GroupListItemView<TModel extends Backbone.Model = Backbone.Model> = CDP.UI.GroupListItemView<TModel>;
    export const GroupListItemView: typeof CDP.UI.GroupListItemView;
    export type ExpandManager = CDP.UI.ExpandManager;
    export const ExpandManager: typeof CDP.UI.ExpandManager;
    export type ExpandableListView<TModel extends Backbone.Model = Backbone.Model> = CDP.UI.ExpandableListView<TModel>;
    export const ExpandableListView: typeof CDP.UI.ExpandableListView;
    export type ListViewOptions = CDP.UI.ListViewOptions;
    export type IListViewFramework = CDP.UI.IListViewFramework;
    export type IScroller = CDP.UI.IScroller;
    export type IScrollable = CDP.UI.IScrollable;
    export type IBackupRestore = CDP.UI.IBackupRestore;
    export type ViewConstructor = CDP.UI.ViewConstructor;
    export type IComposableView = CDP.UI.IComposableView;
    export type IComposableViewStatic = CDP.UI.IComposableViewStatic;
    export type UpdateHeightOptions = CDP.UI.UpdateHeightOptions;
    export type IListItemView = CDP.UI.IListItemView;
    export type BaseListItemView = CDP.UI.BaseListItemView;
    export type EnsureVisibleOptions = CDP.UI.EnsureVisibleOptions;
    export type IListView = CDP.UI.IListView;
    export type BaseListView = CDP.UI.BaseListView;
    export type IStatusManager = CDP.UI.IStatusManager;
    export type IExpandManager = CDP.UI.IExpandManager;
    export type IExpandableListView = CDP.UI.IExpandableListView;
    export type BaseExpandableListView = CDP.UI.BaseExpandableListView;
    export type ListItemViewOptions<TModel extends Backbone.Model = Backbone.Model> = CDP.UI.ListItemViewOptions<TModel>;
    export type ListViewConstructOptions<TModel extends Backbone.Model = Backbone.Model> = CDP.UI.ListViewConstructOptions<TModel>;
    export type GroupListItemViewOptions<TModel extends Backbone.Model = Backbone.Model> = CDP.UI.GroupListItemViewOptions<TModel>;
}
declare module "cdp/ui/jqm" {
    export type Theme = CDP.UI.Theme;
    export const Theme: typeof CDP.UI.Theme;
    export type PlatformTransition = CDP.UI.PlatformTransition;
    export type TransitionMap = CDP.UI.TransitionMap;
    export type ThemeInitOptions = CDP.UI.ThemeInitOptions;
    export type ExtensionManager = CDP.UI.ExtensionManager;
    export const ExtensionManager: typeof CDP.UI.ExtensionManager;
    export type DomExtensionOptions = CDP.UI.DomExtensionOptions;
    export type DomExtension = CDP.UI.DomExtension;
    export module Toast {
        const LENGTH_SHORT: number;
        const LENGTH_LONG: number;
        const StyleBuilderDefault: typeof CDP.UI.Toast.StyleBuilderDefault;
        const show: typeof CDP.UI.Toast.show;
        type OffsetX = CDP.UI.Toast.OffsetX;
        type OffsetY = CDP.UI.Toast.OffsetY;
        type StyleBuilder = CDP.UI.Toast.StyleBuilder;
    }
    export type Dialog = CDP.UI.Dialog;
    export const Dialog: typeof CDP.UI.Dialog;
    export type DialogOptions = CDP.UI.DialogOptions;
    export const alert: typeof CDP.UI.alert;
    export const confirm: typeof CDP.UI.confirm;
    export const prompt: typeof CDP.UI.prompt;
    import Model = CDP.Framework.Model;
    export type BaseHeaderView<TModel extends Model = Model> = CDP.UI.BaseHeaderView<TModel>;
    export const BaseHeaderView: typeof CDP.UI.BaseHeaderView;
    export type BaseHeaderViewOptions<TModel extends Model = Model> = CDP.UI.BaseHeaderViewOptions<TModel>;
    export type BasePage<TModel extends Model = Model> = CDP.UI.BasePage<TModel>;
    export const BasePage: typeof CDP.UI.BasePage;
    export type BasePageOptions<TModel extends Model = Model> = CDP.UI.BasePageOptions<TModel>;
    export type PageContainerView<TModel extends Model = Model> = CDP.UI.PageContainerView<TModel>;
    export const PageContainerView: typeof CDP.UI.PageContainerView;
    export type PageContainerViewOptions<TModel extends Model = Model> = CDP.UI.PageContainerViewOptions<TModel>;
    export type PageView<TModel extends Model = Model> = CDP.UI.PageView<TModel>;
    export const PageView: typeof CDP.UI.PageView;
    export type PageViewConstructOptions<TModel extends Model = Model> = CDP.UI.PageViewConstructOptions<TModel>;
    export type ITabView = CDP.UI.ITabView;
    export type TabViewConstructionOptions<TModel extends Model = Model> = CDP.UI.TabViewConstructionOptions<TModel>;
    export type TabViewContext<TModel extends Model = Model> = CDP.UI.TabViewContext<TModel>;
    export type TabHostViewConstructOptions<TModel extends Model = Model> = CDP.UI.TabHostViewConstructOptions<TModel>;
    export type TabHostView<TModel extends Model = Model> = CDP.UI.TabHostView<TModel>;
    export const TabHostView: typeof CDP.UI.TabHostView;
    export type TabView<TModel extends Model = Model> = CDP.UI.TabView<TModel>;
    export const TabView: typeof CDP.UI.TabView;
    export type PageListView<TModel extends Model = Model> = CDP.UI.PageListView<TModel>;
    export const PageListView: typeof CDP.UI.PageListView;
    export type PageListViewConstructOptions<TModel extends Model = Model> = CDP.UI.PageListViewConstructOptions<TModel>;
    export type PageExpandableListView<TModel extends Model = Model> = CDP.UI.PageExpandableListView<TModel>;
    export const PageExpandableListView: typeof CDP.UI.PageExpandableListView;
}
declare module "cdp/ui" {
    import * as _framework from "cdp/framework/jqm";
    import * as _tools from "cdp/tools/tools";
    export * from "cdp/core/promise";
    export * from "cdp/ui/listview";
    export * from "cdp/ui/jqm";
    export type IPage = _framework.IPage;
    export type Page = _framework.Page;
    export type Orientation = _framework.Orientation;
    export type ShowEventData = _framework.ShowEventData;
    export type HideEventData = _framework.HideEventData;
    export type View<TModel extends _framework.Model = _framework.Model> = CDP.Framework.View<TModel>;
    export const View: typeof Backbone.View;
    export const toUrl: typeof CDP.Framework.toUrl;
    export const registerPage: typeof CDP.Framework.registerPage;
    export const Orientation: typeof CDP.Framework.Orientation;
    export const getOrientation: typeof CDP.Framework.getOrientation;
    export const registerOrientationChangedListener: typeof CDP.Framework.registerOrientationChangedListener;
    export const unregisterOrientationChangedListener: typeof CDP.Framework.unregisterOrientationChangedListener;
    export type JST = _tools.JST;
    export const getTemplate: typeof CDP.Tools.Template.getJST;
    const _CDP_UI: typeof CDP.UI;
    export default _CDP_UI;
}
declare module "cdp/bridge/nativebridge" {
    export type Gate = CDP.NativeBridge.Gate;
    export const Gate: typeof CDP.NativeBridge.Gate;
    export type Feature = CDP.NativeBridge.Feature;
    export type ConstructOptions = CDP.NativeBridge.ConstructOptions;
    export type IResult = CDP.NativeBridge.IResult;
    export type ExecOptions = CDP.NativeBridge.ExecOptions;
}
declare module "cdp/bridge" {
    export * from "cdp/bridge/nativebridge";
    const _CDP_NATIVE_BRIDGE: typeof CDP.NativeBridge;
    export default _CDP_NATIVE_BRIDGE;
}
declare module "cdp" {
    export * from "cdp/core";
    import * as Framework from "cdp/framework";
    import * as Tools from "cdp/tools";
    import * as UI from "cdp/ui";
    import * as NativeBridge from "cdp/bridge";
    export { Framework, Tools, UI, NativeBridge };
    export const initialize: typeof CDP.Framework.initialize;
    export const isInitialized: typeof CDP.Framework.isInitialized;
    export const waitForInitialize: typeof CDP.Framework.waitForInitialize;
    const _CDP: typeof CDP;
    export default _CDP;
}

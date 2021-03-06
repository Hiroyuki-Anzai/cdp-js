﻿/* tslint:disable:no-bitwise */

import {
    PageView,
    registerPage,
    ShowEventData,
    Orientation,
    TabHostView,
} from "cdp/ui";
import { ImageContentCollection } from "../../model/image-content-collection";
import { SwipeableTabHostView } from "./swipe-tab-host-view";

const TAG = "[view.tabviews-sample.SwipeableTabViewPage] ";

/**
 * @class SwipeableTabViewPage
 * @brief TabHostView のオーナー Page クラス
 */
class SwipeableTabViewPage extends PageView {

    private _$tabHighLight: JQuery;
    private _tabHostView: SwipeableTabHostView;
    private _lastActiveTabIndex = 0;
    private _localContentCollection: ImageContentCollection;

    /**
     * constructor
     */
    constructor() {
        super("/templates/tabviews-sample/swipeable-tabview.html",
            "swipeable-tabview",
            {
                route: "tabviews/swipeable-tabview"
            }
        );
        this._localContentCollection = new ImageContentCollection("local");
    }

    ///////////////////////////////////////////////////////////////////////
    // Event Handlers:

    // events binding
    events(): any {
        return {
            "vclick .command-switch-content": this.onSwitchContent,
        };
    }

    // タブの切り替え選択
    private onSwitchContent(event: JQueryEventObject): void {
        const tabIndex: number = ~~$(event.currentTarget).data("tab-index");
        event.preventDefault();
        this._tabHostView.setActiveTab(tabIndex);
        this.updateTabHighlight();
    }

    ///////////////////////////////////////////////////////////////////////
    // Override: PageView

    // Orientation の変更を受信
    onOrientationChanged(newOrientation: Orientation): void {
        super.onOrientationChanged(newOrientation);
        this.updateTabHighlight();
    }

    onPageBeforeShow(event: JQuery.Event, data?: ShowEventData): void {
        super.onPageBeforeShow(event, data);

        // page のサイズを確定する
        this.$page.css("display", "block");

        this._$tabHighLight = this.$header.find(".tab-link-highlight");
        const $tabContainer = this.$page.find(".tab-container");

        this._tabHostView = new SwipeableTabHostView({
            $el: $tabContainer,
            owner: this,
            localContentCollection: this._localContentCollection,
            assetsContentCollection: new ImageContentCollection("assets"),
            $staticRoot: this.$page.find(".static-view"),
        });
        this._tabHostView.on(TabHostView.EVENT_TAB_MOVE, this.onTabMoving.bind(this));
        this._tabHostView.on(TabHostView.EVENT_TAB_STOP, this.onTabChanged.bind(this));

        this.updateTabHighlight(this._lastActiveTabIndex);
        this._tabHostView.setActiveTab(this._lastActiveTabIndex, 0);
    }

    onPageShow(event: JQuery.Event, data?: ShowEventData): void {
        super.onPageShow(event, data);
        this._tabHostView.initializeTabViews();
    }

    onPageRemove(event: JQuery.Event): void {
        if (this._tabHostView) {
            this._lastActiveTabIndex = this._tabHostView.getActiveTabIndex();
            this._tabHostView.remove();
            this._tabHostView = null;
        }
        this._$tabHighLight = null;
        super.onPageRemove(event);
    }

    ///////////////////////////////////////////////////////////////////////
    // callback

    // flip 中にコールされる
    private onTabMoving(delta: number): void {
        this.$page.addClass("swiping");
        this.updateTabHighlight(this._tabHostView.getActiveTabIndex());
    }

    // flip 終了時にコールされる
    private onTabChanged(newIndex: number, moved: boolean): void {
        this.$page.removeClass("swiping");
        this.updateTabHighlight(newIndex);
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods: layout 用

    // tab highlight ポジションの更新
    private updateTabHighlight(index: number = this._tabHostView.getActiveTabIndex()): void {
        const CSS_PREFIXES = ["-webkit-", ""];
        if (this._$tabHighLight) {
            const tabNum = this._tabHostView.getTabCount();
            const pos = (index * this.$page.width() / tabNum) - (this._tabHostView.getSwipeDelta() / tabNum);
            const transform = {};
            for (let i = 0; i < CSS_PREFIXES.length; i++) {
                transform[CSS_PREFIXES[i] + "transform"] = "translate3d(" + pos + "px, 0px, 0px)";
            }
            this._$tabHighLight.css(transform);
        }
    }
}

registerPage(SwipeableTabViewPage);

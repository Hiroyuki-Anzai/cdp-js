﻿namespace CDP.Framework {

    import Promise = CDP.Promise;

    const TAG = "[CDP.Framework.Page] ";

    /**
     * @en Internal Intent interface for managed update info.
     * @ja 更新情報が管理された内部 Intent インターフェイスクラス
     *
     * @internal
     */
    interface ManagedIntent extends Intent {
        /**
         * @en set "true" when update in Page class.
         * @ja ページ内で更新された場合 true
         */
        _update: boolean;
    }

    /**
     * @en Base class of all page unit.
     * @ja すべてのページの基本となる既定クラス
     */
    export class Page implements IPage {

        //////////////////////////////////////////
        // data member

        protected _owner: IPage;
        private _$page: JQuery;
        private _$header: JQuery;
        private _$footer: JQuery;
        private _intent: ManagedIntent;
        private _keepIntent: boolean;
        private _initialized: boolean;

        //////////////////////////////////////////
        // public methods

        /**
         * @param _url
         *  - `en` page's URL
         *  - `ja` ページ URL
         * @param _id
         *  - `en` page's ID
         *  - `ja` ページ ID
         * @param options
         *  - `en` construction options
         *  - `ja` 構築オプション
         */
        constructor(private _url: string, private _id: string, options?: PageConstructOptions) {
            this.setup(options);
        }

        //////////////////////////////////////////
        // public accessor

        get active(): boolean           { return !!this._$page && this._$page.hasClass("ui-page-active");   }
        get url(): string               { return this._url;                                                 }
        get id(): string                { return this._id;                                                  }
        get $page(): JQuery             { return this._$page;                                               }
        get $header(): JQuery           { return this._$header;                                             }
        get $footer(): JQuery           { return this._$footer;                                             }
        get intent(): Intent            { return this._intent;                                              }
        set intent(newIntent: Intent)   { this._intent = <any>newIntent; this._intent._update = true;       }

        //////////////////////////////////////////
        // Implemtents: IPage

        // Orientation の変更を受信
        public onOrientationChanged(newOrientation: Orientation): void {
            if (this._owner) {
                this._owner.onOrientationChanged(newOrientation);
            }
        }

        // H/W Back Button ハンドラ
        public onHardwareBackButton(event?: JQuery.Event): boolean {
            if (this._owner) {
                return this._owner.onHardwareBackButton(event);
            } else {
                return false;
            }
        }

        // Router "before route change" ハンドラ
        public onBeforeRouteChange(): IPromiseBase<any> {
            if (this._owner) {
                return this._owner.onBeforeRouteChange();
            } else {
                return Promise.resolve();
            }
        }

        // 汎用コマンドを受信
        public onCommand(event?: JQuery.Event, kind?: string): boolean {
            if (this._owner) {
                return this._owner.onCommand(event, kind);
            } else {
                return false;
            }
        }

        // 最初の OnPageInit() のときにのみコールされる
        public onInitialize(event: JQuery.Event): void {
            if (this._owner) {
                this._owner.onInitialize(event);
            }
        }

        // jQM event: "pagebeforecreate" に対応
        public onPageBeforeCreate(event: JQuery.Event): void {
            if (this._owner) {
                this._owner.onPageBeforeCreate(event);
            }
        }

        // jQM event: "pagecreate" (旧:"pageinit") に対応
        public onPageInit(event: JQuery.Event): void {
            if (this._owner) {
                this._owner.onPageInit(event);
            }
        }

        // jQM event: "pagebeforeshow" に対応
        public onPageBeforeShow(event: JQuery.Event, data?: ShowEventData): void {
            if (this._owner) {
                this._owner.onPageBeforeShow(event, data);
            }
        }

        // jQM event: "pagecontainershow" (旧:"pageshow") に対応
        public onPageShow(event: JQuery.Event, data?: ShowEventData): void {
            if (this._owner) {
                this._owner.onPageShow(event, data);
            }
        }

        // jQM event: "pagebeforehide" に対応
        public onPageBeforeHide(event: JQuery.Event, data?: HideEventData): void {
            if (this._owner) {
                this._owner.onPageBeforeHide(event, data);
            }
        }

        // jQM event: "pagecontainerhide" (旧:"pagehide") に対応
        public onPageHide(event: JQuery.Event, data?: HideEventData): void {
            if (this._owner) {
                this._owner.onPageHide(event, data);
            }
        }

        // jQM event: "pageremove" に対応
        public onPageRemove(event: JQuery.Event): void {
            if (this._owner) {
                this._owner.onPageRemove(event);
            }
        }

        //////////////////////////////////////////
        // private methods

        // mixin 用疑似コンストラクタ
        private setup(options: PageConstructOptions): void {
            // mixin destination 用の再初期化
            this._initialized = false;
            this._intent = null;

            // イベントバインド
            const selector: string = "#" + this._id;
            $(document)
                .off("pagebeforecreate", selector)
                .on("pagebeforecreate", selector, (event: JQuery.Event) => {
                    this._$page = $(selector).first();
                    this._$header = this._$page.children(":jqmData(role=header)").first();
                    this._$footer = this._$page.children(":jqmData(role=footer)").first();
                    this._$page
                        .on("pagecreate", (ev: JQuery.Event) => {
                            this.pageInit(ev);
                        })
                        .on("pagebeforeshow", (ev: JQuery.Event, data: ShowEventData) => {
                            this.pageBeforeShow(ev, data);
                        })
                        // [Note]instead future version "pagecontainershow".
                        .on("pageshow", (ev: JQuery.Event, data: ShowEventData) => {
                            this.pageShow(ev, data);
                        })
                        .on("pagebeforehide", (ev: JQuery.Event, data: HideEventData) => {
                            this.pageBeforeHide(ev, data);
                        })
                        // [Note]instead future version "pagecontainerhide".
                        .on("pagehide", (ev: JQuery.Event, data: HideEventData) => {
                            this.pageHide(ev, data);
                        })
                        .on("pageremove", (ev: JQuery.Event) => {
                            this.pageRemove(ev);
                        });
                    this.pageBeforeCreate(event);
                });

            options = options || {};

            // owner 設定
            this._owner = options.owner;
            // intent 設定
            this._keepIntent = options.keepIntent;

            // Router へ登録
            if (null == options.route) {
                options.route = this._id;
            }
            Router.register(options.route, this._url, options.top, options.callback);
        }

        // PageTransitionDirection の判定
        private getDirection(): PageTransitionDirection {
            const activeIndex = Router._getJqmHistory().activeIndex;
            const prevIndex = Router._getJqmHistory().previousIndex;

            if (null == activeIndex || null == prevIndex) {
                return "unknown";
            } else if (prevIndex === activeIndex) {
                return "same";
            } else if (activeIndex < prevIndex) {
                return "back";
            } else {
                return "forward";
            }
        }

        private pageBeforeCreate(event: JQuery.Event): void {
            this.onPageBeforeCreate(event);
        }

        private pageInit(event: JQuery.Event): void {
            if (!this._initialized) {
                this.onInitialize(event);
                this._initialized = true;
            }
            this.onPageInit(event);
        }

        private pageBeforeShow(event: JQuery.Event, data: ShowEventData): void {
            Framework._setActivePage(this);
            this._intent = <ManagedIntent>Router._popIntent();
            this.onPageBeforeShow(event, $.extend(data, { direction: this.getDirection() }));
        }

        private pageShow(event: JQuery.Event, data: ShowEventData): void {
            this.onPageShow(event, $.extend(data, { direction: this.getDirection() }));
        }

        private pageBeforeHide(event: JQuery.Event, data: HideEventData): void {
            this.onPageBeforeHide(event, $.extend(data, { direction: this.getDirection() }));
            if (null != this._intent && (this._keepIntent || this._intent._update)) {    // intent に更新があった場合
                delete this._intent._update;
                Router._pushIntent(this._intent);
            } else if (Router.fromHashChanged() && Router.isInSubFlow()) {    // Sub Flow 内で back された場合
                Router._pushIntent(this._intent);
            }
            this._intent = null;
            Framework._setActivePage(null);
        }

        private pageHide(event: JQuery.Event, data: HideEventData): void {
            this.onPageHide(event, $.extend(data, { direction: this.getDirection() }));
        }

        private pageRemove(event: JQuery.Event): void {
            this.onPageRemove(event);
            this._$page.off();
            this._$page = null;
            this._$header.off();
            this._$header = null;
            this._$footer.off();
            this._$footer = null;
        }
    }

    ///////////////////////////////////////////////////////////////////////
    // closure methods

    /*
     * jQM1.4 にて、duplicate とされている "pageshow", "pagehide" はまだ据え置き。
     * http://jquerymobile.com/upgrade-guide/1.4/#navigation
     *
     * 特定ページに対して、イベントを取得できないため。
     * Forum でも議論中なので、決着がついてから対応を考慮する。
     * https://github.com/jquery/jquery-mobile/issues/6865
     *
     * [参考] よくわかるイベントチートシート
     *  - 本家(1.4+) http://jqmtricks.wordpress.com/2014/03/26/jquery-mobile-page-events/
     *  - 有志(~1.3) http://dev.screw-axis.com/doc/jquery_mobile/resources/cheatsheet/
     *
     * 以下は不完全な対応予定コード
     *
     * 特に振る舞いが変わるのは、"pagehide" で、検討されている仕様では
     * DOM を特定できないため、onPageHide() をインスタンスに伝えることができない。
     *
     * 仕様が変わらない場合は
     * onPageBeforeHide() の中で post して onPageHide() を発行する予定(過去互換保証)
     *
     * 2015/03/25 追記:
     * 仕様は確定. jQM1.6 より削除される予定
     *  jQM1.4 相当の参考実装 plugin があり、この実装相当の機能を cdp.framework.jqm で抱える予定
     *  https://github.com/arschmitz/jquery-mobile-onpage
     *
     * 公式見解
     * https://github.com/jquery/jquery-mobile/issues/7283#issuecomment-40746622
     */
/*
    // bind "pagecontainershow", and "pagecontainerhide".
    (() => {
        let $body: any = $("body");
        $(document)
            .on("pagecontainershow", (event: JQuery.Event, data: ShowEventData) => {
                if (0 < data.prevPage.length) {
                    // "pagecontainershow" は "pagecontainerhide" よりも遅いので、やはり DOM にはアクセスできない
                    let $prevpage = $("#" + data.prevPage[0].id);
                    $prevpage.trigger("_pagehide", data);
                }
                // 以下の対応で、"pagecontainershow" は "pageshow" 同等の振る舞いにすることが可能
                let pageId = $body.pagecontainer("getActivePage").prop("id");
                let $page = $("#" + pageId);
                $page.trigger("_pageshow", data);
            })
            .on("pagecontainerhide", (event: JQuery.Event, data: HideEventData) => {
                // "pagecontainerhide" を受けたときは既に DOM から消えているため、page は特定できない。
                //let pageId = $body.pagecontainer('getActivePage').prop("id");
                //let $page = $("#" + pageId);
                //$page.trigger("_pagehide", data);
            })
            .on("pagecontainertransition", (event: JQuery.Event, data: any) => {
                // "pagecontainertransition" には toPage にしかアクセスはできない
            })
        ;
    })();
*/
}

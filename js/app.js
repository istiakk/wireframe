var APP = {};

(function ($) {
    'use strict';
    APP = {
        config: {
            'colorSwatchDropDownSel' : '.js-color-swatch',
            'gallerySel' : '.js-gallery',
            'thumbSel' : '[data-color]',
            'mainImgSel' : '.js-main-img',
            'popupImg' : '.js-image-link',
            'mobileSearchSel' : '#icon-mobile-search',

            // mini cart
            'miniCartSel' : '.mini-cart-label',
            'miniCartItemsSel' : '#mcQty',
            'miniCartTotalSel' : '#mcTotal',
            'productPrice' : '#productPrice'
        },
        init: function() {
            this.events();
            this.mobileMenu();
        },

        events: function() {
            $(document).on('change', this.config.colorSwatchDropDownSel, $.proxy(this.colorSwatch, this));
            $(document).on('click', this.config.gallerySel + " " + this.config.thumbSel, $.proxy(this.selectImg, this));
            $(document).on('click', this.config.popupImg, $.proxy(this.popupImage, this));
            $(document).on('click', this.config.mobileSearchSel, $.proxy(this.mobileSearch, this));
        },

        mobileSearch: function(e) {
            e.preventDefault();
            $('body').toggleClass('l-mobile-search');
        },

        mobileMenu: function() {
            setTimeout(function() {
                $('.mdl-layout__drawer-button').trigger('click')
            }, 1000);

        },

        addToCart: function() {
            var $mcQty = $(this.config.miniCartItemsSel),
                $mc = $(this.config.miniCartSel),
                $mcTotal = $(this.config.miniCartTotalSel),
                productPrice = Number($(this.config.productPrice).val()),
                currTotal = null,
                currQty = null;


            currTotal = Number($mcTotal.text());
            $mcTotal.text(currTotal+productPrice);

            currQty = Number($mcQty.text());
            $mcQty.text(currQty+1);

            $mc.show();
        },

        colorSwatch: function(e) {
            var val = $(e.currentTarget).val(),
                $currImg = $('[data-color="'+ val +'"]');

            if ($currImg.length) {
                $currImg.trigger('click');
            }
        },

        popupImage: function (e) {
            e.preventDefault();
            var $img = $(e.currentTarget),
                src = $img.attr('href');

            $.magnificPopup.open({
                items: {
                    src: src
                },
                type: 'image'
            }, 0);
        },

        selectImg: function(e) {
            var $img = $(e.currentTarget),
                src = $img.find('img').attr('src'),
                $mainImg = $(this.config.mainImgSel + ' img'),
                $mainImgLink = $(this.config.mainImgSel + ' a');
            $img.hide().siblings().show();
            $mainImg.attr('src', src);
            $mainImgLink.attr('href', src);
        }
    };

    $(function() {
       APP.init();

        $("#read-more").on("click", function() {
            var $link = $(this);
            var $content = $link.parent().prev("div.text-content");
            var linkText = $.trim($link.text());

            $content.toggleClass("short-text, full-text");

            $link.text(getShowLinkText(linkText));

            return false;
        });

        function getShowLinkText(currentText) {
            var newText = '';
            if (currentText.toUpperCase() === "READ MORE") {
                newText = "Read Less";
            } else {
                newText = "Read More";
            }

            return newText;
        }

        $(".buybtn").on('click', function () {
                var data = {};
                data['productsName'] = $('#productsName').val();
                $.ajax({
                    url: 'index.html',
                    type: 'post',
                    data: data,
                    success: function (data) {
                        $("#itemNum").show();
                        $("#itemCost").show();
                    }
                });
                return false;
            }
        );
    });
})(jQuery);

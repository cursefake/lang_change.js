(function($) {
    var language = "en";
    window.setLang = function(newLang) {
        if(newLang !== 'en' && newLang !== 'th')
            return Core.error('valid inputs are "en" or "th"');
        if(language === newLang)
            return;
        language = newLang;
        $('[data-th-label]').each(function() {
        var $this = $(this);
        if(!$this.data('en-label') && newLang === 'th')
        $this.data('en-label', $this.text());
        $this.text($this.data(newLang + '-label'));
        })[newLang==='th'?'addClass':'removeClass']('th-style');
    };
    window.getLang = function() {
        return language;
    };
    var updateLang = window.updateLang = function(ancestor) {
        ancestor = ancestor || null;
        $('[en-title]', ancestor).tooltip({
            placement : 'bottom',
            title : function() {
                return $(this).attr(window.getLang() + '-title');
            }
        });
        $('[data-th-label]',ancestor).each(function() {
        var $this = $(this),currentLang=window.getLang();
        if(currentLang === 'th' && !$this.data('en-label'))
        $this.data('en-label', $this.text()).text($this.data(currentLang + '-label'));
        })[window.getLang()==='th'?'addClass':'removeClass']('th-style');
    }
    $.fn.updateLang = function() {
        return this.each(function() {
            updateLang(this);
        })
    };
    $(document).ready(function() {
        $('[en-title]').tooltip({
            placement : 'bottom',
            title : function() {
                return $(this).attr(window.getLang() + '-title');
            }
        });
    });
})(jQuery);

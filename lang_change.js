(function($) {
    var language = "en", validLanguage = {
        'en' : true,
        'th' : true
    };
    window.setLang = function(newLang) {
        if (validLanguage[newLang])
            return console && console.error('valid inputs are "en" or "th"');
        if (language === newLang)
            return;
        language = newLang;
        $('[data-th-label]').each(function() {
            var $this = $(this);
            if (!$this.data('en-label') && newLang === 'th')
                $this.data('en-label', $this.text());
            $this.text($this.data(newLang + '-label'));
        }).toggleClass('th-style');
    };
    window.getLang = function() {
        return language;
    };
    var updateTooltip = function(ancestor) {
        ancestor = ancestor || null;
        $('[en-title]', ancestor).tooltip({
            placement : 'bottom',
            title : function() {
                return $(this).attr(language + '-title');
            }
        });
    };
    var updateLang = window.updateLang = function(ancestor) {
        ancestor = ancestor || null;
        updateTooltip(ancestor);
        $('[data-th-label]', ancestor).each(function() {
            var $this = $(this);
            if (language === 'th' && !$this.data('en-label'))
                $this.data('en-label', $this.text()).text($this.data(language + '-label'));
        }).addClass(language === 'th' ? 'th-style' : '');
    };
    $.fn.updateLang = function() {
        return this.each(function() {
            updateLang(this);
        });
    };
    $(document).ready(updateTooltip);
})(jQuery);

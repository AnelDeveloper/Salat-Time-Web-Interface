import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs';
import en from './translations/en.json';

function loadLocaleMessages() {
    return {
        en    };
}

const storedLocale = (localStorage.getItem('locale') || 'en').toLowerCase();
const [primaryLocale, variationLocale] = storedLocale.split('-');

const i18n = createI18n({
    legacy: false,
    locale: primaryLocale, 
    fallbackLocale: 'en',
    messages: loadLocaleMessages(),
});

export default i18n;

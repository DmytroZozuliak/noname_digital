import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux';
import { settingsActions } from '../../../../store/reducers/settingsSlice';
import { Language } from '../../../../utils/constants/enums';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const language = useTypedSelector((state) => state.settings.language);
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const handleToggle = (_: React.MouseEvent<HTMLElement>, newLang: Language) => {
    dispatch(settingsActions.settingsToggleLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <ToggleButtonGroup
      value={language}
      size="small"
      exclusive
      onChange={handleToggle}
      aria-label="text alignment"
    >
      <ToggleButton value={Language.En} aria-label="left aligned">
        {t('language.en')}
      </ToggleButton>
      <ToggleButton value={Language.Ua} aria-label="centered">
        {t('language.ua')}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitch;

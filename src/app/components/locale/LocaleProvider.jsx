import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    const {language={}} = state;
    return ({
        ...language,
        key: language.locale
    })
}

export default connect(mapStateToProps)(IntlProvider);



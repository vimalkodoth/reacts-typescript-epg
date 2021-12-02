import { render, shallow, mount } from 'enzyme';
import App from '../src/components/App';
describe('App', () => {
    it('should render correctly', () => {
        const wrapper = render(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});

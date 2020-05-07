import { BurgerBuilder } from './BurgerBuilder';
import React from 'react';
import { configure, shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import buildControls from '../../components/Burger/BuildControls/BuildControls';
configure({ adapter : new Adapter()});

describe('<BurgerBuilder/>', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredient = {() => {}}/>);
    });
    it('should render <BuildControls/> when receiving ingredients', () => {
        wrapper.setProps({ings : {Salad : 0}});
        expect(wrapper.find(buildControls)).toHaveLength(1);
    })
});


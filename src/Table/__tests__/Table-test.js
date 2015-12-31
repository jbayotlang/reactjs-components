jest.dontMock('../Table');
jest.dontMock('../../Util/Util');
jest.dontMock('./fixtures/MockTable');

import React from 'react/addons';
import Table from '../Table';
import DOMUtil from '../../Util/DOMUtil';

var TestUtils = React.addons.TestUtils;
var MockTable = require('./fixtures/MockTable');

describe('Table', function () {

  beforeEach(function () {
    this.callback = jasmine.createSpy();
    this.idAttribute = 'id';
    this.sortBy = {
      prop: 'name',
      order: 'desc'
    };
    this.instance = TestUtils.renderIntoDocument(
      <Table
        className="table"
        columns={MockTable.columns}
        data={MockTable.rows}
        idAttribute={this.idAttribute}
        sortBy={this.sortBy}
        onSortCallback={this.callback} />
    );
    this.instance.itemHeight = 0;
    this.getComputedDimensions = DOMUtil.getComputedDimensions;
    DOMUtil.getComputedDimensions = function () {
      return {width: 0, height: 0};
    };
  });

  afterEach(function () {
    DOMUtil.getComputedDimensions = this.getComputedDimensions;
  });

  it('should render the proper number of columns', function () {
    expect(this.instance.getHeaders(MockTable.columns, this.sortBy).length)
      .toEqual(4);
  });

  it('should call the callback when the data is sorted', function () {
    this.instance.handleSort();
    expect(this.callback).toHaveBeenCalled();
  });

  describe('emptyMessage prop', function () {
    beforeEach(function () {
      this.emptyMessage = 'This is a custom message';
      this.instance = TestUtils.renderIntoDocument(
        <Table
          className="table"
          columns={MockTable.columns}
          data={[]}
          emptyMessage={this.emptyMessage}
          idAttribute={this.idAttribute}
          sortBy={this.sortBy}
          onSortCallback={this.callback} />
      );
    });

    it('should display the custom empty message', function () {
      var result = TestUtils.renderIntoDocument(
        this.instance.getEmptyRowCell([1])
      );

      result = TestUtils.findRenderedDOMComponentWithTag(
        result, 'tr'
      );

      expect(React.findDOMNode(result).textContent).toBe(this.emptyMessage);
    });

    it('should display the default empty message', function () {
      var instance = TestUtils.renderIntoDocument(
        <Table
          className="table"
          columns={MockTable.columns}
          data={[]}
          idAttribute={this.idAttribute}
          sortBy={this.sortBy}
          onSortCallback={this.callback} />
      );

      var result = TestUtils.renderIntoDocument(
        instance.getEmptyRowCell([1])
      );

      result = TestUtils.findRenderedDOMComponentWithTag(
        result, 'tr'
      );

      expect(React.findDOMNode(result).textContent).toBe(
        Table.defaultProps.emptyMessage
      );
    });
  });

});

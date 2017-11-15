import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fuzzaldrin from 'fuzzaldrin-plus';
import Downshift from 'downshift';

const FuzzyAutocomplete = ({
  onChange,
  placeholder,
  items,
  itemStringKey,
  itemReturnKey = null,
}) => {
  return (
    <Downshift
      defaultIsOpen={true}
      onChange={onChange}
      defaultInputValue=""
      defaultHighlightedIndex={0}
      itemToString={i => (i ? i[itemStringKey] : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
      }) => {
        console.log(
          'these are the items',
          inputValue.length === 0
            ? items
            : fuzzaldrin.filter(items, inputValue, {
                key: itemStringKey,
              })
        );
        return (
          <div>
            <label {...getLabelProps()} />
            <input
              autoFocus
              {...getInputProps({
                placeholder,
              })}
            />
            <div>
              {/* 💁 fuzzaldrin returns an empty array if the input is an empty string, but I want to show all the options instead */}
              {(inputValue.length === 0
                ? items
                : fuzzaldrin.filter(items, inputValue, {
                    key: itemStringKey,
                  })
              ).map((item, index) => {
                console.log('item, index', item, index);
                return (
                  <div
                    {...getItemProps({
                      key: itemStringKey ? item[itemStringKey] : item,
                      index,
                      item: item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight:
                          selectedItem === item[itemStringKey]
                            ? 'bold'
                            : 'normal',
                      },
                    })}
                  >
                    {inputValue.length === 0 ? (
                      <span>{item[itemStringKey]}</span>
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: fuzzaldrin.wrap(
                            item[itemStringKey],
                            inputValue
                          ),
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
};

export default FuzzyAutocomplete;

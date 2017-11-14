import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fuzzaldrin from 'fuzzaldrin-plus';
import Downshift from 'downshift';

const FuzzyAutocomplete = ({
  onChange,
  // isOpen,
  placeholder,
  items,
  itemStringKey,
}) => {
  return (
    <Downshift
      isOpen={true}
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
        return (
          <div>
            <label {...getLabelProps()} />
            <input
              autoFocus
              {...getInputProps({
                placeholder,
              })}
            />
            {isOpen ? (
              <div>
                {fuzzaldrin
                  .filter(items, inputValue, {
                    key: itemStringKey,
                  })
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item.action,
                        index,
                        item: item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight:
                            selectedItem === item.copy ? 'bold' : 'normal',
                        },
                      })}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: fuzzaldrin.wrap(item.copy, inputValue),
                        }}
                      />
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
};

export default FuzzyAutocomplete;

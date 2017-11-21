import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fuzzaldrin from 'fuzzaldrin-plus';
import Downshift from 'downshift';
import styled from 'styled-components';

const StyledResults = styled.div`
  .commander-result {
    padding: 5px;

    &:first-child {
      border-top: 1px solid #ccc;
    }
  }
`;
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
        return (
          <div>
            <label {...getLabelProps()} />
            <input
              autoFocus
              {...getInputProps({
                placeholder,
              })}
            />
            <StyledResults>
              {/* 💁 fuzzaldrin returns an empty array if the input is an empty string, but I want to show all the options instead */}
              {(inputValue.length === 0
                ? items
                : fuzzaldrin.filter(items, inputValue, {
                    key: itemStringKey,
                  })
              ).map((item, index) => {
                return (
                  <div
                    className="commander-result"
                    {...getItemProps({
                      key: itemStringKey ? item[itemStringKey] : item,
                      index,
                      item: item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? '#f5f5f5' : 'white',
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
            </StyledResults>
          </div>
        );
      }}
    </Downshift>
  );
};

export default FuzzyAutocomplete;

import React, { useRef, useCallback } from "react";
import { StyleSheet, Dimensions, View, FlatList } from "react-native";
//import { useFocusEffect } from "@react-navigation/native";

import Item from "./Item";

const { height } = Dimensions.get("window");

function FeedVideoArray({ listArray, index, isFocused }) {
  const itemId = useRef(listArray[0].postId);
  const cellRefs = useRef({});
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 10 });

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((item) => {
      const cell = cellRefs.current[item.key];
      if (cell) {
        if (item.isViewable) {
          cell.play();
          itemId.current = item.key;
        } else {
          cell.pause();
        }
      }
    });
  });

  //For Navigation Off Screen
  // useFocusEffect(
  //   React.useCallback(() => {
  //     //Screen in Focus
  //     if (cellRefs.current[itemId.current]) {
  //       cellRefs.current[itemId.current].play();
  //     }
  //     return () => {
  //       //Screen out of Focus
  //       if (cellRefs.current[itemId.current]) {
  //         cellRefs.current[itemId.current].pause();
  //       }
  //     };
  //   }, [cellRefs])
  // );

  const _ItemLayout = (list, index) => ({
    length: height,
    offset: height * index,
    index,
  });

  const _keyExtractor = useCallback((item) => item.postId.toString(), []);

  const _renderItem = useCallback(({ item }) => (
    <Item
      ref={(ref) => {
        cellRefs.current[item.postId] = ref;
      }}
      postData={item}
      windowHeight={height}
    />
  ));

  return (
    <View style={styles.container}>
      <FlatList
        //Required Props
        data={listArray}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        //Functionality Props
        getItemLayout={_ItemLayout}
        initialScrollIndex={index ? index : null} //Could possibly use ScrollToIndex in the future (will need ref of flaslist to work)
        onViewableItemsChanged={onViewableItemsChanged.current}
        snapToInterval={height}
        snapToAlignment={"center"}
        viewabilityConfig={viewConfigRef.current}
        decelerationRate={0}
        //Optimization Props
        initialNumToRender={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedVideoArray;

import React, {useState} from 'react';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MSpacing} from '@/constant/measurements';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {MThemeColors} from '@/constant/colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {
  IUserExerciseRecords,
  useGetUserExerciseRecords,
} from '@/apis/exercise.db';
import {useExtractDocument} from '@/hooks/useExtractFirebaseData';
import {startSpinner, stopSpinner} from '@/redux/slice/spinner.slice';
import PerkInfoModal from './PerkInfoModal';
import CheckoutInfoModal from './CheckoutModal';

interface MyShopItem {
  id: string;
  name: string;
  image: string;
  price: number;
}
interface CartItem {
  [item_id: string]: {
    id: string;
    name: string;
    image: string;
    price: number;
    qty: number;
  };
}

const my_shop_listing: MyShopItem[] = [
  {
    id: '101',
    name: 'ATR 100% Leather tight grip gloves',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2F14TUSFU309.jpg?alt=media&token=345b9119-bc89-4662-b359-d0a202c7addb',
    price: 20,
  },
  {
    id: '102',
    name: 'Gym Bottle (Hydrate yourself)',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2F30688552.webp?alt=media&token=1b597fd2-6f1a-4958-be6a-00021685b810',
    price: 7,
  },
  {
    id: '103',
    name: 'All in one shaker for you',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2F61wa31YjkyL.jpg?alt=media&token=71deed3f-0f57-447e-9989-19a79015aa24',
    price: 9.9,
  },
  {
    id: '104',
    name: 'Pack of 3 sweat resistence towel',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2F713sl9p3dWL.jpg?alt=media&token=57f6f8ce-74fb-4daf-b87c-a2a3b265bcbd',
    price: 5.5,
  },
  {
    id: '105',
    name: 'Hard grip gloves',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2F817-qalF8sL._AC_UF894%2C1000_QL80_.jpg?alt=media&token=a5c5ccf1-e20f-46da-9095-cb2645779a81',
    price: 15,
  },
  {
    id: '106',
    name: 'Soft and light towel',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2F81SKTletWUL._AC_UF894%2C1000_QL80_.jpg?alt=media&token=2deb9a5b-b4b0-4574-98d4-f87a5da00eba',
    price: 7,
  },
  {
    id: '107',
    name: 'Elictric shaker bottle',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2FBest-Shaker-Bottles-HT-Tout-fd4c84f2ab6b439eb297802f4e04b738.jpg?alt=media&token=58536dcc-1a9b-4c0a-a470-78f5aeda830b',
    price: 13,
  },
  {
    id: '108',
    name: 'WHEY Gold Standard Protein 500gm',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2Fbest-protein-powders-available-refresh-lead-1668468392.jpg?alt=media&token=d7aec1d8-601d-420e-908e-9e9a0e605ffc',
    price: 70,
  },
  {
    id: '109',
    name: 'WHEY Gold Standard Protein 1Kg',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2Fbest-proteins-of-2021-2-700xh.jpg?alt=media&token=28f2e5d8-5184-4a52-8e49-dd2264c8cd17',
    price: 120,
  },
  {
    id: '110',
    name: 'Your everyday sipper',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2Fblue_3_7.jpg?alt=media&token=d107f888-71b7-49f0-b2f6-aa4e5ab1f601',
    price: 6.5,
  },
  {
    id: '111',
    name: 'RDX 100% pure leather belt for your perfect deadlifts',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2Frdx_rd1_4_powerlifting_leather_gym_belt_red_6_.jpg?alt=media&token=073395af-da57-4152-8425-ebb08b2c0a10',
    price: 160,
  },
  {
    id: '112',
    name: 'COWHIDE LEATHER belt for your everyday support',
    image:
      'https://firebasestorage.googleapis.com/v0/b/my-fitness-care.appspot.com/o/gym-shop%2Fs-l1200.jpg?alt=media&token=3f1e3a27-d95f-4f58-bc89-a72fa975e922',
    price: 150,
  },
];

export default function GymShop() {
  // const [grossTotal, setGrossTotal] = useState(100);
  const [cartItem, setCartItem] = useState<CartItem>({});
  const [discountEarned, setDiscountEarned] = useState(0);
  const [cashDiscount, setCashDiscount] = useState(0);
  const [modaVis, setModalVis] = useState(false);
  const [checkoutModalVis, setCheckoutModalVis] = useState(false);

  // const currentCart
  const grossBalance = (() => {
    if (Object.keys(cartItem).length > 0) {
      let a = 0;
      Object.values(cartItem).map(el => {
        a += el.price * el.qty;
      });
      return a;
    } else {
      return 0;
    }
  })();
  const netBalance = (() => {
    if (Object.keys(cartItem).length > 0) {
      let a = 0;
      Object.values(cartItem).map(el => {
        a += el.price * el.qty;
      });
      return a - cashDiscount - (discountEarned / 100) * a;
    } else {
      return 0;
    }
  })();

  // AUTH STATE
  // Data fetching logic
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {data, isLoading, isFetching} = useGetUserExerciseRecords(
    authState.frUser?.uid ?? '',
  );

  const {mappedData} = useExtractDocument<IUserExerciseRecords>(data);

  const recalcDiscountEarned = () => {
    const tempExp = mappedData?.economy.m_exp ?? 0;
    const tempCoin = mappedData?.economy.m_coin ?? 0;
    if (tempExp <= 500) {
      setDiscountEarned(5);
    } else if (tempExp > 500 && tempExp <= 1000) {
      setDiscountEarned(10);
    } else if (tempExp > 1000 && tempExp <= 1500) {
      setDiscountEarned(15);
    } else if (tempExp > 1500 && tempExp <= 2000) {
      setDiscountEarned(20);
    } else if (tempExp > 2000 && tempExp <= 2500) {
      setDiscountEarned(25);
    } else if (tempExp > 2500 && tempExp <= 3000) {
      setDiscountEarned(30);
    } else if (tempExp > 3000 && tempExp <= 3500) {
      setDiscountEarned(35);
    } else if (tempExp > 3500 && tempExp <= 4000) {
      setDiscountEarned(40);
    } else if (tempExp > 4000 && tempExp <= 4500) {
      setDiscountEarned(45);
    } else if (tempExp > 4500 && tempExp <= 5000) {
      setDiscountEarned(50);
    } else if (tempExp > 5000) {
      // Additional discount on the basis of earned coins too
      const additionalDiscount = Math.round(tempCoin / 100);
      setCashDiscount(additionalDiscount);
      setDiscountEarned(50);
    }
  };

  const updateCart = (operation: 'add' | 'remove', item_id: string) => {
    // console.log('Calling me:', item_id);
    // console.log('Operation:', operation);
    // console.log('Cart: ', cartItem);
    let copy = cartItem;
    // Check if item is already in the cart
    const exist = Object.keys(copy).find(el => el === item_id);
    if (exist) {
      if (operation === 'add') {
        copy[exist].qty++;
      } else {
        copy[exist].qty--;
      }
      setCartItem(copy);
    } else {
      const item_from_self = my_shop_listing.find(el => el.id === item_id);
      if (item_from_self) {
        copy = {
          ...copy,
          [item_id]: {
            ...item_from_self,
            qty: 1,
          },
        };
        setCartItem(copy);
      }
    }
  };

  const myItemCount = (item_id: string) => {
    const exist = Object.keys(cartItem).find(el => el === item_id);
    if (exist) {
      return cartItem[item_id].qty;
    } else {
      return 0;
    }
  };

  const resetCart = () => {
    setCheckoutModalVis(true);
    setDiscountEarned(0);
    setCashDiscount(0);
    setCartItem({});
  };

  React.useEffect(() => {
    // console.log('mapped Data', mappedData);
    if (isLoading && isFetching) {
      dispatch(startSpinner());
    } else {
      recalcDiscountEarned();
      dispatch(stopSpinner());
    }
    // console.log('Mapped Data: ', mappedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching]);

  return (
    <SafeAreaScrollView noHorizontalPadding>
      <PerkInfoModal visible={modaVis} setVisible={setModalVis} />
      <CheckoutInfoModal
        visible={checkoutModalVis}
        setVisible={setCheckoutModalVis}
      />
      <View className="flex flex-row items-center bg-white px-4 py-4">
        <View className="flex flex-1 flex-row justify-between items-center">
          <View>
            {/* <Text className="ml-4 font-bold text-sm">Your Cart</Text> */}
            <Text className="ml-4 font-bold text-sm">
              Gross Total: £{grossBalance.toFixed(2)}
            </Text>
            <Text className="ml-4 font-bold text-sm text-green-500">
              Discount Earned: {discountEarned}%
            </Text>
            <Text className="ml-4 font-bold text-sm text-green-700">
              Net Total: £{netBalance.toFixed(2)}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <MaterialIcon name="cart" size={22} color={MThemeColors.black} />
            <TouchableOpacity
              className="p-2 ml-4 bg-black"
              onPress={() => resetCart()}>
              <Text className="text-white">Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        className="py-4 mt-2"
        style={{
          marginHorizontal: MSpacing.screenPadding,
        }}>
        <Text className="text-center font-medium text-base">
          Your virtual economy stat:
        </Text>
        <View className="flex flex-row justify-between py-4">
          <Text className="font-medium text-orange-500">
            Experience: {mappedData?.economy.m_exp} exp
          </Text>

          <Text className="font-medium text-green-600">
            Fitness Coin: {mappedData?.economy.m_coin}
          </Text>
        </View>
      </View>

      <View
        className="py-4 bg-white flex flex-col items-center"
        style={{
          paddingHorizontal: MSpacing.screenPadding,
        }}>
        {/* <Text className="text-sm font-medium">
          Lets get those hard earned points to work shall we?
        </Text> */}

        <Text className="text-base text-center font-medium">
          The more you exercise, the more discounts you will get in our shop 🤑
        </Text>
        <TouchableOpacity
          className="py-2 mt-2"
          onPress={() => setModalVis(true)}>
          <Text className="text-blue-500">Learn more</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row flex-wrap mt-4">
        {my_shop_listing.map(el => (
          <View className="w-1/2 p-4" key={el.id}>
            <View className="flex flex-col p-4 rounded-xl bg-white">
              <Image
                className="w-24 h-24 self-center"
                resizeMode="contain"
                source={{
                  uri: el.image,
                }}
              />
              <View>
                <View>
                  <Text className="text-sm font-normal mt-6">{el.name}</Text>
                  <Text className="text-xl font-semibold mt-2">
                    £{el.price}
                  </Text>
                </View>
                <View className="flex flex-row justify-center mt-4">
                  <TouchableOpacity
                    disabled={myItemCount(el.id) === 0}
                    className="bg-red-300 flex-1 self-center p-2 rounded-xl"
                    onPress={() => updateCart('remove', el.id)}>
                    <Text className="text-center">-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="mx-2 flex-1 p-2">
                    <Text className="text-center">{myItemCount(el.id)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-green-300 flex-1 p-2 rounded-xl"
                    onPress={() => updateCart('add', el.id)}>
                    <Text className="text-center">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaScrollView>
  );
}

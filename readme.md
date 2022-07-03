# KIKI's DELIVERY SERVICE

This program is a command line application to estimate the Total delivery cost of each Package with an Offer code (if applicable).
Each package detail is taken from the user in a certain format (more information provided in "Instructions" section).

### INSTALLATION

On your terminal, change into the root project directory
and run the following command

```bash
npm i
```

### INSTRUCTIONS

After successful installation run the following command:

```bash
npm start
```

Follow the prompts on the terminal screen:

1. Enter base delivery cost and the number of packages in below format separated by space:

```bash
100 3
```

If the above input format entered is incorrect, then the error message "Incorrect format" will appear. Please re-enter with the correct input format.

2. Enter each package detail in the format "pkg_id1 pkg_weight1_in_kg distance1_in_km offer_code1"
   separated by space as shown in below sample:

```bash
PKG1 5 5 OFR001
```

If the format entered is incorrect, then the error message "Incorrect format" will appear. Please re-enter with the correct input format.

**Offer codes and respective discount and criterias**

The following offers(discounts) are valid only if the package's weight and distance fall in that offer's range:

| Discount     | Weight(kg) | Distance(km) |
| ------------ | :--------: | -----------: |
| OFR001 (10%) |   70-200   |         <200 |
| OFR002 (7%)  |  100-250   |       50-150 |
| OFR003 (5%)  |   10-150   |       50-250 |

**Rules:**

- Only one offer code per package.
- If offer code is not found in the above table, the discounted amount will be equal to 0.

**Formula to calculate total delivery cost of each package**

```bash
Delivery cost = Base Delivery Cost + (Package Total Weight * 10) + (Distance to Destination * 5);
```

### EXAMPLES

**Sample (I)**

_base_delivery_cost no_of_packges:_

```bash
100 3
```

_pkg_id1 pkg_weight1_in_kg distance1_in_km offer_code1:_

```bash
PKG1 5 5 OFR001
PKG2 15 5 OFR002
PKG3 10 100 OFR003
PKG4 10 100 OFR004
```

**Sample (O)**

```bash
PKG1 0 175
PKG2 0 275
PKG3 35 665
PKG4 0 700
```

### TEST CASES

To run test cases run following command in terminal:

```bash
npm test
```

/** @format */

import { OrderBookEntries } from '@src/@types'

import cn from 'classnames'
import React from 'react'

import OrderBookPanelModuleScssModule from './orderBookPanel.module.scss'
import styles from './orderBookPanel.module.scss'

const { format: priceFormatter } = new Intl.NumberFormat(navigator.language, {
  minimumFractionDigits: 2,
})
const { format: sizeFormatter } = new Intl.NumberFormat(navigator.language)

type OrderBookPanelProps = {
  groupedValues: OrderBookEntries
  theme: 'red' | 'green'
  isMobileView: boolean
}

function OrderBookPanel({
  groupedValues,
  theme,
  isMobileView,
}: OrderBookPanelProps) {
  if (isMobileView && theme === 'green') {
    groupedValues.reverse()
  }

  const priceClass = styles[theme]
  const barClass =
    styles[`${theme}Bar` as keyof typeof OrderBookPanelModuleScssModule]

  return (
    <section
      className={cn(styles.orderBookPanel, {
        [`${styles.order1}`]: isMobileView && theme === 'red',
        [`${styles.paddingTop}`]: !isMobileView || theme === 'green',
      })}
    >
      {/* <caption>Color names and values</caption> */}
      <table className={styles.table}>
        {!isMobileView || theme === 'green' ? (
          <thead className={styles.head}>
            <tr className={styles.tableRow}>
              <th className={styles.tableCell}>TOTAL</th>
              <th
                className={cn(
                  styles.tableCell,
                  (theme === 'green' || isMobileView) && styles.order1
                )}
              >
                SIZE
              </th>
              <th
                className={cn(
                  styles.tableCell,
                  (theme === 'green' || isMobileView) && styles.order0
                )}
              >
                PRICE
              </th>
            </tr>
          </thead>
        ) : null}
        <tbody className={styles.body}>
          {groupedValues.map((groupedValue, groupedValueIndex) => (
            <tr
              className={styles.tableRow}
              key={groupedValueIndex}
            >
              <td className={styles.tableCell}>
                {sizeFormatter(groupedValue.total)}
              </td>
              <td
                className={cn(
                  styles.tableCell,
                  (theme === 'green' || isMobileView) && styles.order1
                )}
              >
                {sizeFormatter(groupedValue.size)}
              </td>
              <td
                className={cn(
                  priceClass,
                  styles.tableCell,
                  (theme === 'green' || isMobileView) && styles.order0
                )}
              >
                {priceFormatter(groupedValue.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <svg
        width='100%'
        height={Math.floor(16.4 * groupedValues.length)}
        preserveAspectRatio='none'
        viewBox={`0 0 100 ${groupedValues.length}`}
        aria-labelledby='title desc'
        role='img'
      >
        {groupedValues.map((groupedValue, groupedValueIndex) => (
          <rect
            key={groupedValueIndex}
            className={cn(barClass)}
            width={`${groupedValue.barWidth}%`}
            height='1'
            x={`${
              theme === 'green' && !isMobileView
                ? 0
                : 100 - groupedValue.barWidth
            }`}
            y={groupedValueIndex}
          ></rect>
        ))}
      </svg>
    </section>
  )
}

export default OrderBookPanel

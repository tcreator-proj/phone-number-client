import { connect } from 'react-redux'
import React from 'react'
import styles from './PhonesList.module.sass'
import { type RootState } from '../../redux/store'
import type Phone from '../../models/Phone'

interface PhonesListProps {
  numList: Phone[]
}

function PhonesList ({ numList }: PhonesListProps) {
  const getItems = () => numList.map((phone: Phone) => (
    <ul className="item" key={phone.id}>
      {`(${phone.countryCode}) ${phone.phoneNumber}`}
    </ul>
  ))

  return (
    <div className={styles.phonesList} data-testid="PhonesList">
      <ul>
        {getItems()}
      </ul>
    </div>
  )
}
const mapStateToProps = (state: RootState) => ({
  numList: state.phone.numList
})

export default connect(mapStateToProps)(React.memo(PhonesList))

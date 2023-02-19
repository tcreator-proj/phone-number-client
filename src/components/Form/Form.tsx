import React, { type FormEventHandler } from 'react'
import styles from './Form.module.sass'

interface FromProps {
  onSubmitForm: FormEventHandler
}

function Form ({ onSubmitForm }: FromProps) {
  return (
    <form
      className={styles.form}
      data-testid="Form"
      onSubmit={onSubmitForm}
    >
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          type="number"
          id="num"
          minLength={3}
          maxLength={10}
          placeholder="type your phone"
        />
        <select id="phone-country">
          <option value="russia">+7</option>
          <option value="armenia">+374</option>
          <option value="bolivia">+591</option>
        </select>
      </div>
    </form>
  )
}
export default React.memo(Form)

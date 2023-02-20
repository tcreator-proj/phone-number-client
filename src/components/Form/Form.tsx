import React, { type FormEventHandler } from 'react'
import styles from './Form.module.sass'

interface FromProps {
  onSubmitForm: FormEventHandler
  onInput: FormEventHandler
}

function Form ({ onSubmitForm, onInput }: FromProps) {
  return (
    <form
      className={styles.form}
      data-testid="Form"
      onSubmit={onSubmitForm}
    >
      <div className={styles.inputBox}>
        <input
          onInput={onInput}
          className={styles.input}
          type="number"
          pattern="[0-9]{3,10}"
          required
          id="num"
          placeholder="type your phone"
        />
        <select id="phone-country">
          <option value="+7">+7</option>
          <option value="+374">+374</option>
          <option value="+591">+591</option>
        </select>
      </div>
    </form>
  )
}
export default React.memo(Form)

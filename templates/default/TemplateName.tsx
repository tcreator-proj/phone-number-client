import styles from './TemplateName.module.sass';

interface TemplateNameProps {}

const TemplateName = ({}: TemplateNameProps) => (
    <div className={styles.templateName} data-testid="TemplateName">
        TemplateName Component
    </div>
);

export default TemplateName;

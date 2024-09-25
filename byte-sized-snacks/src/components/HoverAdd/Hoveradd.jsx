import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import styles from './Hoveradd.module.css';

export default function Hoveradd() {
    return (
      <div>
        <div className={styles.hoverButtonWrapper}>
          <Button className={styles.hoverButton}>
            <Plus className={styles.buttonIcon} />
          </Button>
          
        </div>
      </div>
    );
};
  
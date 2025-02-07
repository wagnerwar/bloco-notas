import React, { useContext, useState, useEffect, Component, useMemo } from 'react';
import { ToastAndroid } from 'react-native';

export const exibirAviso = (m:string) => {
    ToastAndroid.show(
        m,
        ToastAndroid.SHORT
    );
}
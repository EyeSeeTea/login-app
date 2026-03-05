import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { FormNotice } from '../../components/index.js'

export const LoginErrors = ({
    lngs = ['en'],
    error,
    twoFAIncorrect,
    requiresTwoFactorEnrolment,
    passwordExpired,
    passwordResetEnabled,
    accountInaccessible,
    unknownStatus,
    emailTwoFAIncorrect,
    smsTwoFAIncorrect,
    isResetButtonPressed,
    twoFACodeRequired,
    twoFAVerificationRequired,
}) => {
    if (error) {
        return (
            <FormNotice
                title={
                    !error?.details?.httpStatusCode ||
                    error.details.httpStatusCode >= 500
                        ? i18n.t('Something went wrong', {
                              lngs,
                          })
                        : i18n.t('Incorrect username or password', {
                              lngs,
                          })
                }
                error
            >
                {(!error.details?.httpStatusCode ||
                    error.details.httpStatusCode >= 500) && (
                    <span>{error?.message}</span>
                )}
            </FormNotice>
        )
    }

    if (
        twoFACodeRequired &&
        twoFAVerificationRequired &&
        !isResetButtonPressed
    ) {
        return (
            <FormNotice
                title={i18n.t('Authentication code is required', { lngs })}
                error
            />
        )
    }

    if (twoFAIncorrect) {
        return (
            <FormNotice
                title={i18n.t('Incorrect authentication code', { lngs })}
                error
            />
        )
    }

    if (requiresTwoFactorEnrolment) {
        return (
            <FormNotice
                title={i18n.t('Two-factor authentication setup required', {
                    lngs,
                })}
                error
            >
                <span>
                    {i18n.t(
                        'Due to security policy requirements, two-factor authentication is mandatory. Set up two-factor authentication to continue using the app.',
                        { lngs }
                    )}
                </span>
            </FormNotice>
        )
    }

    if (emailTwoFAIncorrect && !isResetButtonPressed) {
        return (
            <FormNotice
                title={i18n.t('Incorrect authentication code', { lngs })}
                error
            />
        )
    }
    if (smsTwoFAIncorrect && !isResetButtonPressed) {
        return (
            <FormNotice
                title={i18n.t('Incorrect authentication code', { lngs })}
                error
            />
        )
    }

    if (passwordExpired) {
        return (
            <FormNotice
                title={i18n.t('Password expired', {
                    lngs,
                })}
                error
            >
                {passwordResetEnabled ? (
                    <Link to="/reset-password">
                        {i18n.t(
                            'You can reset your password from the password reset page.'
                        )}
                    </Link>
                ) : (
                    i18n.t('Contact your system administrator.')
                )}
            </FormNotice>
        )
    }
    if (accountInaccessible) {
        return (
            <FormNotice
                title={i18n.t('Account not accessible', {
                    lngs,
                })}
                error
            >
                {i18n.t('Contact your system administrator.')}
            </FormNotice>
        )
    }
    if (unknownStatus) {
        return (
            <FormNotice
                title={i18n.t('Something went wrong', {
                    lngs,
                })}
                error
            >
                {i18n.t('Contact your system administrator.')}
            </FormNotice>
        )
    }
    return null
}

LoginErrors.propTypes = {
    accountInaccessible: PropTypes.bool,
    emailTwoFAIncorrect: PropTypes.bool,
    error: PropTypes.object,
    isResetButtonPressed: PropTypes.bool,
    lngs: PropTypes.arrayOf(PropTypes.string),
    passwordExpired: PropTypes.bool,
    passwordResetEnabled: PropTypes.bool,
    requiresTwoFactorEnrolment: PropTypes.bool,
    smsTwoFAIncorrect: PropTypes.bool,
    twoFACodeRequired: PropTypes.bool,
    twoFAIncorrect: PropTypes.bool,
    twoFAVerificationRequired: PropTypes.bool,
    unknownStatus: PropTypes.bool,
}

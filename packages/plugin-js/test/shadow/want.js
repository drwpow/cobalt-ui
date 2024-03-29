/**
 * Design Tokens
 * Autogenerated from tokens.json.
 * DO NOT EDIT!
 */

export const tokens = {
  'shadow.base': [{
    offsetX: '0',
    offsetY: '4px',
    blur: '8px',
    spread: '0',
    color: 'rgb(0, 0, 0, 0.15)',
    inset: false,
  }],
  'shadow.inset': [{
    offsetX: '0',
    offsetY: '4px',
    blur: '8px',
    spread: '0',
    color: 'rgb(0, 0, 0, 0.15)',
    inset: true,
  }],
  'shadow.layered': [{
    offsetX: '0',
    offsetY: '1px',
    blur: '1px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.12)',
    inset: false,
  }, {
    offsetX: '0',
    offsetY: '2px',
    blur: '2px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.12)',
    inset: false,
  }, {
    offsetX: '0',
    offsetY: '4px',
    blur: '4px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.12)',
    inset: false,
  }, {
    offsetX: '0',
    offsetY: '8px',
    blur: '8px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.12)',
    inset: false,
  }, {
    offsetX: '0',
    offsetY: '16px',
    blur: '16px',
    spread: '0',
    color: 'rgba(0, 0, 0, 0.12)',
    inset: false,
  }],
  'shadow.simple': [{
    offsetX: '0',
    offsetY: '4px',
    blur: '8px',
    spread: '0',
    color: 'rgb(0, 0, 0, 0.15)',
    inset: false,
  }],
};

export const meta = {
  'shadow.base': {
    _original: {
      $type: 'shadow',
      $value: '{shadow.simple}',
    },
    _group: {
      id: 'shadow',
      $extensions: {
        requiredModes: [],
      },
    },
    id: 'shadow.base',
    $type: 'shadow',
    $value: [{
      offsetX: '0',
      offsetY: '4px',
      blur: '8px',
      spread: '0',
      color: 'rgb(0, 0, 0, 0.15)',
      inset: false,
    }],
  },
  'shadow.inset': {
    _original: {
      $type: 'shadow',
      $value: {
        inset: true,
        offsetX: 0,
        offsetY: '4px',
        blur: '8px',
        spread: 0,
        color: 'rgb(0, 0, 0, 0.15)',
      },
    },
    _group: {
      id: 'shadow',
      $extensions: {
        requiredModes: [],
      },
    },
    id: 'shadow.inset',
    $type: 'shadow',
    $value: [{
      offsetX: '0',
      offsetY: '4px',
      blur: '8px',
      spread: '0',
      color: 'rgb(0, 0, 0, 0.15)',
      inset: true,
    }],
  },
  'shadow.layered': {
    _original: {
      $type: 'shadow',
      $value: [{
        offsetX: 0,
        offsetY: '1px',
        blur: '1px',
        color: 'rgba(0, 0, 0, 0.12)',
      }, {
        offsetX: 0,
        offsetY: '2px',
        blur: '2px',
        color: 'rgba(0, 0, 0, 0.12)',
      }, {
        offsetX: 0,
        offsetY: '4px',
        blur: '4px',
        color: 'rgba(0, 0, 0, 0.12)',
      }, {
        offsetX: 0,
        offsetY: '8px',
        blur: '8px',
        color: 'rgba(0, 0, 0, 0.12)',
      }, {
        offsetX: 0,
        offsetY: '16px',
        blur: '16px',
        color: 'rgba(0, 0, 0, 0.12)',
      }],
    },
    _group: {
      id: 'shadow',
      $extensions: {
        requiredModes: [],
      },
    },
    id: 'shadow.layered',
    $type: 'shadow',
    $value: [{
      offsetX: '0',
      offsetY: '1px',
      blur: '1px',
      spread: '0',
      color: 'rgba(0, 0, 0, 0.12)',
      inset: false,
    }, {
      offsetX: '0',
      offsetY: '2px',
      blur: '2px',
      spread: '0',
      color: 'rgba(0, 0, 0, 0.12)',
      inset: false,
    }, {
      offsetX: '0',
      offsetY: '4px',
      blur: '4px',
      spread: '0',
      color: 'rgba(0, 0, 0, 0.12)',
      inset: false,
    }, {
      offsetX: '0',
      offsetY: '8px',
      blur: '8px',
      spread: '0',
      color: 'rgba(0, 0, 0, 0.12)',
      inset: false,
    }, {
      offsetX: '0',
      offsetY: '16px',
      blur: '16px',
      spread: '0',
      color: 'rgba(0, 0, 0, 0.12)',
      inset: false,
    }],
  },
  'shadow.simple': {
    _original: {
      $type: 'shadow',
      $value: {
        offsetX: 0,
        offsetY: '4px',
        blur: '8px',
        spread: 0,
        color: 'rgb(0, 0, 0, 0.15)',
      },
    },
    _group: {
      id: 'shadow',
      $extensions: {
        requiredModes: [],
      },
    },
    id: 'shadow.simple',
    $type: 'shadow',
    $value: [{
      offsetX: '0',
      offsetY: '4px',
      blur: '8px',
      spread: '0',
      color: 'rgb(0, 0, 0, 0.15)',
      inset: false,
    }],
  },
};

export const modes = {};

/** Get individual token */
export function token(tokenID, modeName) {
  if (modeName && modes[tokenID] && modeName in modes[tokenID]) return modes[tokenID][modeName];
  return tokens[tokenID];
}

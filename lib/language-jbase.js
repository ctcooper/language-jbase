'use babel';

import LanguageJbaseView from './language-jbase-view';
import { CompositeDisposable } from 'atom';

export default {

  languageJbaseView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageJbaseView = new LanguageJbaseView(state.languageJbaseViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageJbaseView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-jbase:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageJbaseView.destroy();
  },

  serialize() {
    return {
      languageJbaseViewState: this.languageJbaseView.serialize()
    };
  },

  toggle() {
    console.log('LanguageJbase was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
